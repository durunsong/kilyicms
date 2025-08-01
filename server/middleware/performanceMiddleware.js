/**
 * 性能监控中间件
 * 收集和记录API响应时间、系统资源使用情况等性能指标
 */
const responseTime = require("response-time");
const { logInfo, logWarning } = require("../config/logger");

// 性能统计数据存储
const performanceStats = {
  requests: {
    total: 0,
    byPath: new Map(),
    byMethod: new Map(),
    byStatusCode: new Map()
  },
  responseTimes: {
    total: 0,
    count: 0,
    min: Infinity,
    max: 0,
    byPath: new Map()
  },
  activeConnections: 0,
  memoryUsage: {
    lastCheck: Date.now(),
    samples: []
  },
  errors: {
    total: 0,
    byType: new Map()
  }
};

/**
 * 响应时间中间件配置
 * 自动添加 X-Response-Time 头并记录性能数据
 */
const responseTimeMiddleware = responseTime((req, res, time) => {
  // 更新统计数据
  updatePerformanceStats(req, res, time);

  // 记录慢请求警告
  if (time > 1000) {
    // 超过1秒的请求
    logWarning("Slow request detected", {
      path: req.originalUrl,
      method: req.method,
      responseTime: `${time}ms`,
      statusCode: res.statusCode,
      ip: req.ip,
      userAgent: req.get("User-Agent")
    });
  }

  // 定期记录性能摘要
  if (performanceStats.requests.total % 100 === 0) {
    logPerformanceSummary();
  }
});

/**
 * 更新性能统计数据
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {number} time - 响应时间(毫秒)
 */
const updatePerformanceStats = (req, res, time) => {
  const path = req.originalUrl;
  const method = req.method;
  const statusCode = res.statusCode;

  // 请求总数统计
  performanceStats.requests.total++;

  // 按路径统计
  const pathStats = performanceStats.requests.byPath.get(path) || { count: 0, totalTime: 0 };
  pathStats.count++;
  pathStats.totalTime += time;
  performanceStats.requests.byPath.set(path, pathStats);

  // 按HTTP方法统计
  const methodCount = performanceStats.requests.byMethod.get(method) || 0;
  performanceStats.requests.byMethod.set(method, methodCount + 1);

  // 按状态码统计
  const statusCount = performanceStats.requests.byStatusCode.get(statusCode) || 0;
  performanceStats.requests.byStatusCode.set(statusCode, statusCount + 1);

  // 响应时间统计
  performanceStats.responseTimes.total += time;
  performanceStats.responseTimes.count++;
  performanceStats.responseTimes.min = Math.min(performanceStats.responseTimes.min, time);
  performanceStats.responseTimes.max = Math.max(performanceStats.responseTimes.max, time);

  // 按路径的响应时间统计
  const pathTimeStats = performanceStats.responseTimes.byPath.get(path) || {
    total: 0,
    count: 0,
    min: Infinity,
    max: 0
  };
  pathTimeStats.total += time;
  pathTimeStats.count++;
  pathTimeStats.min = Math.min(pathTimeStats.min, time);
  pathTimeStats.max = Math.max(pathTimeStats.max, time);
  performanceStats.responseTimes.byPath.set(path, pathTimeStats);

  // 错误统计
  if (statusCode >= 400) {
    performanceStats.errors.total++;
    const errorType = statusCode >= 500 ? "server_error" : "client_error";
    const errorCount = performanceStats.errors.byType.get(errorType) || 0;
    performanceStats.errors.byType.set(errorType, errorCount + 1);
  }
};

/**
 * 活跃连接监控中间件
 */
const connectionMonitor = (req, res, next) => {
  // 增加活跃连接数
  performanceStats.activeConnections++;

  // 监听响应完成事件，减少活跃连接数
  res.on("finish", () => {
    performanceStats.activeConnections--;
  });

  res.on("close", () => {
    performanceStats.activeConnections--;
  });

  next();
};

/**
 * 内存使用监控
 * 定期收集内存使用情况
 */
const memoryMonitor = {
  start: () => {
    setInterval(() => {
      const memUsage = process.memoryUsage();
      const cpuUsage = process.cpuUsage();

      const sample = {
        timestamp: Date.now(),
        memory: {
          rss: memUsage.rss, // 常驻集大小
          heapTotal: memUsage.heapTotal, // 堆总大小
          heapUsed: memUsage.heapUsed, // 堆使用大小
          external: memUsage.external, // 外部内存使用
          arrayBuffers: memUsage.arrayBuffers // ArrayBuffers 使用
        },
        cpu: {
          user: cpuUsage.user, // 用户CPU时间
          system: cpuUsage.system // 系统CPU时间
        }
      };

      // 保留最近100个样本
      performanceStats.memoryUsage.samples.push(sample);
      if (performanceStats.memoryUsage.samples.length > 100) {
        performanceStats.memoryUsage.samples.shift();
      }

      performanceStats.memoryUsage.lastCheck = Date.now();

      // 检查内存使用是否过高
      const heapUsedMB = memUsage.heapUsed / 1024 / 1024;
      if (heapUsedMB > 512) {
        // 超过512MB警告
        logWarning("High memory usage detected", {
          heapUsedMB: heapUsedMB.toFixed(2),
          heapTotalMB: (memUsage.heapTotal / 1024 / 1024).toFixed(2),
          rssMB: (memUsage.rss / 1024 / 1024).toFixed(2),
          activeConnections: performanceStats.activeConnections
        });
      }
    }, 30000); // 每30秒检查一次
  }
};

/**
 * 记录性能摘要
 */
const logPerformanceSummary = () => {
  const avgResponseTime =
    performanceStats.responseTimes.count > 0
      ? (performanceStats.responseTimes.total / performanceStats.responseTimes.count).toFixed(2)
      : 0;

  // 获取最新的内存使用情况
  const latestMemory =
    performanceStats.memoryUsage.samples.length > 0
      ? performanceStats.memoryUsage.samples[performanceStats.memoryUsage.samples.length - 1]
      : null;

  // 计算错误率
  const errorRate =
    performanceStats.requests.total > 0
      ? ((performanceStats.errors.total / performanceStats.requests.total) * 100).toFixed(2)
      : 0;

  // 获取最慢的5个路径
  const slowestPaths = Array.from(performanceStats.responseTimes.byPath.entries())
    .map(([path, stats]) => ({
      path,
      avgTime: (stats.total / stats.count).toFixed(2),
      maxTime: stats.max,
      count: stats.count
    }))
    .sort((a, b) => parseFloat(b.avgTime) - parseFloat(a.avgTime))
    .slice(0, 5);

  logInfo("Performance Summary", {
    requests: {
      total: performanceStats.requests.total,
      errorRate: `${errorRate}%`,
      activeConnections: performanceStats.activeConnections
    },
    responseTime: {
      average: `${avgResponseTime}ms`,
      min: `${performanceStats.responseTimes.min}ms`,
      max: `${performanceStats.responseTimes.max}ms`
    },
    memory: latestMemory
      ? {
          heapUsedMB: (latestMemory.memory.heapUsed / 1024 / 1024).toFixed(2),
          heapTotalMB: (latestMemory.memory.heapTotal / 1024 / 1024).toFixed(2),
          rssMB: (latestMemory.memory.rss / 1024 / 1024).toFixed(2)
        }
      : null,
    slowestPaths: slowestPaths,
    timestamp: new Date().toISOString()
  });
};

/**
 * 获取性能统计数据
 * @returns {Object} 完整的性能统计数据
 */
const getPerformanceStats = () => {
  return {
    ...performanceStats,
    summary: {
      avgResponseTime:
        performanceStats.responseTimes.count > 0
          ? (performanceStats.responseTimes.total / performanceStats.responseTimes.count).toFixed(2)
          : 0,
      errorRate:
        performanceStats.requests.total > 0
          ? ((performanceStats.errors.total / performanceStats.requests.total) * 100).toFixed(2)
          : 0,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  };
};

/**
 * 重置性能统计数据
 */
const resetPerformanceStats = () => {
  performanceStats.requests.total = 0;
  performanceStats.requests.byPath.clear();
  performanceStats.requests.byMethod.clear();
  performanceStats.requests.byStatusCode.clear();
  performanceStats.responseTimes.total = 0;
  performanceStats.responseTimes.count = 0;
  performanceStats.responseTimes.min = Infinity;
  performanceStats.responseTimes.max = 0;
  performanceStats.responseTimes.byPath.clear();
  performanceStats.errors.total = 0;
  performanceStats.errors.byType.clear();
  performanceStats.memoryUsage.samples = [];

  logInfo("Performance stats reset", { timestamp: new Date().toISOString() });
};

/**
 * 请求超时监控中间件
 * @param {number} timeout - 超时时间(毫秒)
 */
const timeoutMonitor = (timeout = 30000) => {
  return (req, res, next) => {
    const timeoutId = setTimeout(() => {
      if (!res.headersSent) {
        logWarning("Request timeout", {
          path: req.originalUrl,
          method: req.method,
          timeout: `${timeout}ms`,
          ip: req.ip
        });

        res.status(408).json({
          status: 408,
          message: "请求超时",
          timeout: `${timeout}ms`,
          timestamp: new Date().toISOString()
        });
      }
    }, timeout);

    // 清理超时定时器
    res.on("finish", () => clearTimeout(timeoutId));
    res.on("close", () => clearTimeout(timeoutId));

    next();
  };
};

module.exports = {
  responseTimeMiddleware,
  connectionMonitor,
  memoryMonitor,
  timeoutMonitor,
  getPerformanceStats,
  resetPerformanceStats,
  logPerformanceSummary,
  performanceStats
};
