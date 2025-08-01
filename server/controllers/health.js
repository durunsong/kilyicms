/**
 * 健康检查控制器
 * 提供系统状态、数据库连接、性能监控等健康检查接口
 */
const { healthCheck: dbHealthCheck, getPoolStatus } = require("../config/db-connection");
const { getPerformanceStats } = require("../middleware/performanceMiddleware");

/**
 * 基础健康检查
 * GET /health
 */
const basicHealth = (req, res) => {
  try {
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      version: process.env.npm_package_version || "2.0.1",
      service: "kilyicms-server"
    };

    res.status(200).json(healthData);
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};

/**
 * 详细健康检查
 * GET /health/detailed
 */
const detailedHealth = async (req, res) => {
  try {
    // 获取数据库健康状态
    const dbHealth = await dbHealthCheck();

    // 获取性能统计
    const performanceStats = getPerformanceStats();

    // 获取内存使用情况
    const memoryUsage = process.memoryUsage();

    // 获取CPU使用情况
    const cpuUsage = process.cpuUsage();

    // 获取系统负载（仅在Unix系统上可用）
    let loadAverage = null;
    try {
      loadAverage = require("os").loadavg();
    } catch {
      // Windows 系统不支持 loadavg
    }

    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),

      // 基础信息
      service: {
        name: "kilyicms-server",
        version: process.env.npm_package_version || "2.0.1",
        environment: process.env.NODE_ENV || "development",
        uptime: process.uptime(),
        pid: process.pid,
        nodeVersion: process.version
      },

      // 数据库状态
      database: dbHealth,

      // 性能统计
      performance: {
        requests: performanceStats.summary,
        activeConnections: performanceStats.activeConnections,
        responseTime: {
          average: performanceStats.summary.avgResponseTime + "ms",
          min: performanceStats.responseTimes.min === Infinity ? "0ms" : performanceStats.responseTimes.min + "ms",
          max: performanceStats.responseTimes.max + "ms"
        }
      },

      // 系统资源
      system: {
        memory: {
          rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
          heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
          heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
          external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
          arrayBuffers: `${(memoryUsage.arrayBuffers / 1024 / 1024).toFixed(2)} MB`
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system
        },
        loadAverage: loadAverage
      }
    };

    // 如果数据库不健康，返回degraded状态
    if (dbHealth.status !== "healthy") {
      healthData.status = "degraded";
    }

    const statusCode = healthData.status === "healthy" ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    const { logError } = require("../config/logger");
    logError("Health check failed", error);

    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
      service: "kilyicms-server"
    });
  }
};

/**
 * 数据库健康检查
 * GET /health/database
 */
const databaseHealth = async (req, res) => {
  try {
    const dbHealth = await dbHealthCheck();
    const poolStatus = getPoolStatus();

    const healthData = {
      ...dbHealth,
      pool: poolStatus,
      timestamp: new Date().toISOString()
    };

    const statusCode = dbHealth.status === "healthy" ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
      component: "database"
    });
  }
};

/**
 * 性能监控健康检查
 * GET /health/performance
 */
const performanceHealth = (req, res) => {
  try {
    const performanceStats = getPerformanceStats();

    // 判断性能健康状态
    let status = "healthy";
    const avgResponseTime = parseFloat(performanceStats.summary.avgResponseTime);
    const errorRate = parseFloat(performanceStats.summary.errorRate);

    if (avgResponseTime > 2000 || errorRate > 10) {
      status = "degraded";
    }

    if (avgResponseTime > 5000 || errorRate > 25) {
      status = "unhealthy";
    }

    const healthData = {
      status,
      timestamp: new Date().toISOString(),
      metrics: {
        averageResponseTime: avgResponseTime + "ms",
        errorRate: errorRate + "%",
        totalRequests: performanceStats.requests.total,
        activeConnections: performanceStats.activeConnections,
        uptime: process.uptime()
      },
      thresholds: {
        responseTime: {
          warning: "2000ms",
          critical: "5000ms",
          current: avgResponseTime + "ms"
        },
        errorRate: {
          warning: "10%",
          critical: "25%",
          current: errorRate + "%"
        }
      }
    };

    const statusCode = status === "healthy" ? 200 : status === "degraded" ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message,
      component: "performance"
    });
  }
};

/**
 * 就绪检查（Readiness Check）
 * 检查服务是否准备好接收流量
 * GET /health/ready
 */
const readinessCheck = async (req, res) => {
  try {
    // 检查关键依赖
    const checks = {
      database: await dbHealthCheck(),
      server: { status: "healthy" }
    };

    // 判断整体就绪状态
    const isReady = Object.values(checks).every((check) => check.status === "healthy");

    const healthData = {
      status: isReady ? "ready" : "not_ready",
      timestamp: new Date().toISOString(),
      checks
    };

    const statusCode = isReady ? 200 : 503;
    res.status(statusCode).json(healthData);
  } catch (error) {
    res.status(503).json({
      status: "not_ready",
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
};

/**
 * 存活检查（Liveness Check）
 * 检查服务是否仍在运行
 * GET /health/live
 */
const livenessCheck = (req, res) => {
  // 简单的存活检查，只要能响应就说明服务还活着
  res.status(200).json({
    status: "alive",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    pid: process.pid
  });
};

/**
 * Ping检查
 * GET /ping
 */
const ping = (req, res) => {
  res.status(200).json({
    message: "pong",
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  basicHealth,
  detailedHealth,
  databaseHealth,
  performanceHealth,
  readinessCheck,
  livenessCheck,
  ping
};
