/**
 * 应用程序入口文件 - 优化版
 * 稳定启动，友好的错误处理
 */

// 环境变量配置
require("dotenv").config();

// 核心模块
const express = require("express");
const path = require("path");

// 基础中间件
const bodyParserMiddleware = require("../middleware/bodyParserMiddleware");
const corsMiddleware = require("../middleware/corsMiddleware");

// 原有路由
const userRoutes = require("../routes/userRoutes");

// 日志系统
let logger;
try {
  logger = require("../config/logger");
  console.log("✅ 日志系统加载成功");
} catch {
  console.warn("⚠️ 日志系统加载失败，使用控制台输出");
  // 创建简单的日志替代
  logger = {
    logInfo: (msg, meta) => console.log("INFO:", msg, meta || ""),
    logError: (msg, error, meta) => console.error("ERROR:", msg, error?.message || error, meta || ""),
    logWarning: (msg, meta) => console.warn("WARN:", msg, meta || "")
  };
}

// 创建 Express 应用实例
const app = express();

// 信任代理（如果在反向代理后面运行）
app.set("trust proxy", 1);

// 基础中间件
app.use(bodyParserMiddleware.json);
app.use(bodyParserMiddleware.urlencoded);
app.use(corsMiddleware);

// 请求日志中间件 - 记录所有API调用
let requestLogger;
try {
  requestLogger = require("../middleware/requestLoggerMiddleware");
  app.use(requestLogger);
  console.log("✅ 请求日志中间件加载成功");
} catch {
  console.warn("⚠️ 请求日志中间件加载失败");
}

// 静态资源服务
app.use(express.static(path.join(__dirname, "../public")));

// 视图引擎配置
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// 测试路由
app.get("/test", (req, res) => {
  res.json({
    status: "ok",
    message: "🎉 服务器运行正常！",
    timestamp: new Date().toISOString(),
    features: {
      logger: logger ? "✅ 可用" : "⚠️ 降级模式",
      database: "⚠️ 需要配置",
      bcrypt: "✅ 可用"
    }
  });
});

// 健康检查端点
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "2.0.1",
    service: "kilyicms-server",
    features: {
      server: "✅ 运行中",
      logger: logger ? "✅ 正常" : "⚠️ 降级模式",
      database: "⚠️ 需要配置"
    }
  });
});

// 添加原有的用户路由
app.use("/", userRoutes);

// 数据库初始化（不阻塞启动）
const initializeDatabase = async () => {
  try {
    console.log("🔌 正在连接数据库...");
    const { connectDb } = require("../config/db-connection");
    await connectDb();
    console.log("✅ 数据库连接成功");

    if (logger.logInfo) {
      logger.logInfo("Database connection established", {
        host: "localhost",
        database: "test"
      });
    }

    return true;
  } catch (error) {
    console.log("⚠️ 数据库连接失败，服务器将在无数据库模式下运行");
    console.log("💡 提示: 请检查MySQL服务是否启动，用户名密码是否正确");
    console.log("📝 当前配置: host=localhost, user=root, password=123456, database=test");
    console.log("");

    if (logger.logWarning) {
      logger.logWarning("Database connection failed, running in degraded mode", {
        error: error.message,
        config: {
          host: "localhost",
          user: "root",
          database: "test"
        }
      });
    }

    return false;
  }
};

// 错误处理中间件
app.use((err, req, res, _next) => {
  console.error("💥 应用错误:", err.message);

  if (logger.logError) {
    logger.logError("Application error", err, {
      url: req.originalUrl,
      method: req.method,
      ip: req.ip
    });
  }

  res.status(500).json({
    status: 500,
    message: "服务器内部错误",
    timestamp: new Date().toISOString(),
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "页面未找到",
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    tip: "请检查URL是否正确"
  });
});

// 异步初始化数据库（不阻塞启动）
setTimeout(() => {
  initializeDatabase().then((success) => {
    if (success) {
      console.log("🎉 所有服务已就绪！");
    } else {
      console.log("⚡ 服务器已启动（数据库功能暂不可用）");
      console.log("🔧 数据库相关功能需要先配置MySQL连接");
    }
  });
}, 1000);

// 记录启动信息
if (logger.logInfo) {
  logger.logInfo("Application starting up", {
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    processId: process.pid,
    timestamp: new Date().toISOString()
  });
}

console.log("🚀 应用初始化完成");

// 导出应用实例
module.exports = app;
