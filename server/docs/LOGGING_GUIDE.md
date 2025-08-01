# 日志记录系统使用指南

## 概述

项目现已集成完整的日志记录系统，能够记录所有API调用、数据库操作、用户行为和系统错误。

## 日志文件位置

所有日志文件都保存在 `server/logs/` 目录下：

```
server/logs/
├── access-YYYY-MM-DD.log      # API访问日志
├── combined-YYYY-MM-DD.log    # 综合日志
├── database-YYYY-MM-DD.log    # 数据库操作日志
└── error-YYYY-MM-DD.log       # 错误日志
```

## 日志类型

### 1. API访问日志 (access-\*.log)

记录所有前端调用后端接口的详细信息：

- 请求方法 (GET, POST, PUT, DELETE)
- 请求URL和参数
- 响应状态码和时间
- 客户端IP和User-Agent
- 用户身份信息（如果已登录）

### 2. 数据库操作日志 (database-\*.log)

记录所有数据库查询和操作：

- SQL操作类型 (SELECT, INSERT, UPDATE, DELETE)
- 查询执行时间
- 影响的表和记录数
- 慢查询检测

### 3. 用户行为日志 (combined-\*.log)

记录用户的关键操作：

- 登录/登出
- 用户注册
- 用户管理操作（增删改查）
- JWT令牌刷新

### 4. 错误日志 (error-\*.log)

记录所有系统错误：

- 数据库连接错误
- JWT验证失败
- 业务逻辑错误
- 系统异常

## 日志级别

- **ERROR**: 系统错误和异常
- **WARN**: 警告信息（如登录失败、权限不足）
- **INFO**: 一般信息（如成功操作、系统状态）
- **DEBUG**: 调试信息（仅在开发环境）

## 日志格式示例

### API访问日志

```
2024-01-15 10:30:25 [INFO]: API Access | Meta: {
  "method": "POST",
  "url": "/api/users/login",
  "statusCode": 200,
  "responseTime": "45ms",
  "userAgent": "Mozilla/5.0...",
  "ip": "192.168.1.100",
  "userId": "12345"
}
```

### 数据库操作日志

```
2024-01-15 10:30:25 [INFO]: Database SELECT | Meta: {
  "table": "users",
  "operation": "SELECT",
  "duration": "12ms",
  "data": {"count": 1}
}
```

## 监控和分析

### 1. 实时监控

```bash
# 监控API访问日志
tail -f server/logs/access-$(date +%Y-%m-%d).log

# 监控错误日志
tail -f server/logs/error-$(date +%Y-%m-%d).log

# 监控所有日志
tail -f server/logs/combined-$(date +%Y-%m-%d).log
```

### 2. 常用查询命令

#### 查看登录尝试

```bash
grep "Login attempt" server/logs/combined-*.log
```

#### 查看登录失败

```bash
grep "Login failed" server/logs/combined-*.log
```

#### 查看数据库错误

```bash
grep "Database Error" server/logs/database-*.log
```

#### 查看特定IP的活动

```bash
grep "192.168.1.100" server/logs/access-*.log
```

#### 查看慢查询（>1秒）

```bash
grep "duration.*[0-9][0-9][0-9][0-9]ms" server/logs/database-*.log
```

### 3. 性能分析

#### 响应时间分析

```bash
# 查看响应时间超过1秒的请求
grep "responseTime.*[0-9][0-9][0-9][0-9]ms" server/logs/access-*.log
```

#### 错误率统计

```bash
# 统计今天的错误数量
grep -c "ERROR" server/logs/error-$(date +%Y-%m-%d).log
```

## 安全监控

### 1. 可疑活动检测

```bash
# 检测暴力登录攻击
grep "Login failed" server/logs/combined-*.log | cut -d'"' -f8 | sort | uniq -c | sort -nr

# 检测异常访问频率
grep "API Access" server/logs/access-*.log | cut -d'"' -f8 | sort | uniq -c | sort -nr
```

### 2. 权限违规检测

```bash
# 查看无权限访问尝试
grep "no token\|token error" server/logs/combined-*.log
```

## 日志文件管理

### 自动轮转

- 日志文件按日期自动轮转
- 保留30天的综合日志和访问日志
- 保留14天的错误日志和数据库日志
- 单个文件最大20MB

### 清理旧日志

```bash
# 手动清理30天前的日志
find server/logs -name "*.log" -mtime +30 -delete
```

## 开发建议

### 1. 新增接口时

确保在控制器中添加适当的日志记录：

```javascript
const { logInfo, logError, logWarning } = require("../config/logger");

// 记录请求开始
logInfo("New API request", {
  ip: req.ip,
  userAgent: req.get("User-Agent")
});

// 记录成功操作
logInfo("Operation successful", {
  userId: user.id,
  operation: "create_user"
});

// 记录错误
logError("Operation failed", error, {
  userId: user.id,
  operation: "create_user"
});
```

### 2. 数据库操作

使用提供的数据库日志函数：

```javascript
const { logDbOperation, logDbError } = require("../config/logger");

// 记录数据库操作
logDbOperation("SELECT", "users", { count: results.length }, duration);

// 记录数据库错误
logDbError("SELECT", "users", error, query);
```

## 问题排查

### 常见问题定位

1. **用户无法登录**

   ```bash
   grep "用户名" server/logs/combined-*.log | grep "Login"
   ```

2. **接口响应慢**

   ```bash
   grep "responseTime.*[0-9][0-9][0-9][0-9]ms" server/logs/access-*.log
   ```

3. **数据库连接问题**

   ```bash
   grep "Database.*Error" server/logs/error-*.log
   ```

4. **JWT令牌问题**
   ```bash
   grep "JWT\|token" server/logs/combined-*.log
   ```

通过这个完善的日志系统，您现在可以全面监控应用程序的运行状态、用户行为和系统性能。
