/**
 * 请求日志中间件
 * 记录所有API请求的详细信息和响应时间
 */
const { logApiAccess, logInfo } = require("../config/logger");

/**
 * 请求日志中间件函数
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
const requestLogger = (req, res, next) => {
  // 记录请求开始时间
  const startTime = Date.now();

  // 记录请求基本信息
  const requestInfo = {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
    contentType: req.get("Content-Type"),
    timestamp: new Date().toISOString()
  };

  // 记录请求开始日志（除了密码等敏感信息）
  const logBody = { ...req.body };
  if (logBody.password) {
    logBody.password = "****"; // 隐藏密码
  }
  if (logBody.confirmPassword) {
    logBody.confirmPassword = "****"; // 隐藏确认密码
  }

  logInfo("Incoming Request", {
    ...requestInfo,
    query: req.query,
    body: Object.keys(logBody).length > 0 ? logBody : undefined,
    headers: {
      authorization: req.get("Authorization") ? "Bearer ****" : undefined,
      "content-length": req.get("Content-Length"),
      accept: req.get("Accept")
    }
  });

  // 监听响应完成事件
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;

    // 记录API访问日志
    logApiAccess(req, res, responseTime);

    // 记录响应完成日志
    logInfo("Request Completed", {
      ...requestInfo,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      contentLength: res.get("Content-Length")
    });
  });

  // 监听响应错误事件
  res.on("error", (error) => {
    const responseTime = Date.now() - startTime;
    const { logError } = require("../config/logger");

    logError("Request Error", error, {
      ...requestInfo,
      responseTime: `${responseTime}ms`
    });
  });

  next();
};

/**
 * 跳过日志记录的路径列表
 * 这些路径通常是静态资源或健康检查端点
 */
const skipPaths = ["/favicon.ico", "/health", "/ping"];

/**
 * 带有路径过滤的请求日志中间件
 * @param {Object} req - Express请求对象
 * @param {Object} res - Express响应对象
 * @param {Function} next - Express下一个中间件函数
 */
const conditionalRequestLogger = (req, res, next) => {
  // 检查是否需要跳过日志记录
  const shouldSkip = skipPaths.some((path) => req.originalUrl.startsWith(path));

  if (shouldSkip) {
    return next();
  }

  return requestLogger(req, res, next);
};

module.exports = {
  requestLogger,
  conditionalRequestLogger,
  skipPaths
};
