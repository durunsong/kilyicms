/**
 * 错误处理中间件
 * 提供统一的错误响应格式和详细的错误日志记录
 */
const { logError, logWarning } = require("../config/logger");

/**
 * 自定义错误类
 */
class AppError extends Error {
  constructor(message, statusCode, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 异步错误捕获包装器
 * 用于包装异步路由处理函数，自动捕获Promise错误
 */
const asyncErrorHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * 数据库错误处理器
 * @param {Object} error - 数据库错误对象
 * @returns {Object} 格式化的错误响应
 */
const handleDatabaseError = (error) => {
  let message = "数据库操作失败";
  let statusCode = 500;

  // MySQL 错误代码处理
  switch (error.errno) {
    case 1062: // 重复键错误
      message = "数据已存在，请检查唯一字段";
      statusCode = 409;
      break;
    case 1451: // 外键约束错误
      message = "无法删除，存在关联数据";
      statusCode = 409;
      break;
    case 1452: // 外键约束错误
      message = "关联数据不存在";
      statusCode = 400;
      break;
    case 1054: // 未知列错误
      message = "数据格式错误";
      statusCode = 400;
      break;
    case 1146: // 表不存在
      message = "系统配置错误";
      statusCode = 500;
      break;
    default:
      if (error.sqlState) {
        message = "数据库操作失败，请稍后重试";
      }
  }

  return { message, statusCode };
};

/**
 * JWT 错误处理器
 * @param {Object} error - JWT错误对象
 * @returns {Object} 格式化的错误响应
 */
const handleJWTError = (error) => {
  let message = "认证失败";
  let statusCode = 401;

  if (error.name === "JsonWebTokenError") {
    message = "无效的访问令牌";
  } else if (error.name === "TokenExpiredError") {
    message = "访问令牌已过期，请重新登录";
  } else if (error.name === "NotBeforeError") {
    message = "访问令牌尚未生效";
  }

  return { message, statusCode };
};

/**
 * 验证错误处理器
 * @param {Object} error - 验证错误对象
 * @returns {Object} 格式化的错误响应
 */
const handleValidationError = (error) => {
  const message = error.message || "输入数据格式不正确";
  return { message, statusCode: 400 };
};

/**
 * 开发环境错误响应
 * @param {Object} error - 错误对象
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const sendErrorDev = (error, req, res) => {
  // API 错误响应
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      request: {
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString()
      }
    });
  }

  // 网页错误响应
  res.status(error.statusCode).render("error", {
    title: "Error",
    message: error.message,
    error: error
  });
};

/**
 * 生产环境错误响应
 * @param {Object} error - 错误对象
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const sendErrorProd = (error, req, res) => {
  // API 错误响应
  if (req.originalUrl.startsWith("/api")) {
    // 操作性错误：发送详细信息给客户端
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }

    // 编程错误：不要泄露错误详情
    return res.status(500).json({
      status: 500,
      message: "服务器内部错误，请稍后重试",
      timestamp: new Date().toISOString()
    });
  }

  // 网页错误响应
  if (error.isOperational) {
    res.status(error.statusCode).render("error", {
      title: "Error",
      message: error.message,
      error: {}
    });
  } else {
    res.status(500).render("error", {
      title: "Error",
      message: "页面加载失败，请稍后重试",
      error: {}
    });
  }
};

/**
 * 全局错误处理中间件
 * @param {Object} error - 错误对象
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} _next - 下一个中间件函数
 */
const globalErrorHandler = (error, req, res, _next) => {
  // 设置默认错误状态码
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  // 记录错误日志
  const errorInfo = {
    name: error.name,
    message: error.message,
    statusCode: error.statusCode,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
    userId: req.user?.id || "anonymous",
    timestamp: new Date().toISOString()
  };

  // 根据错误级别记录不同类型的日志
  if (error.statusCode >= 500) {
    logError("Server Error", error, errorInfo);
  } else if (error.statusCode >= 400) {
    logWarning("Client Error", errorInfo);
  }

  // 处理特定类型的错误
  let transformedError = { ...error };

  // 数据库错误
  if (error.errno || error.sqlState) {
    const dbError = handleDatabaseError(error);
    transformedError.message = dbError.message;
    transformedError.statusCode = dbError.statusCode;
    transformedError.isOperational = true;
  }

  // JWT 错误
  if (error.name && error.name.includes("Token")) {
    const jwtError = handleJWTError(error);
    transformedError.message = jwtError.message;
    transformedError.statusCode = jwtError.statusCode;
    transformedError.isOperational = true;
  }

  // 验证错误
  if (error.name === "ValidationError" || error.name === "CastError") {
    const validationError = handleValidationError(error);
    transformedError.message = validationError.message;
    transformedError.statusCode = validationError.statusCode;
    transformedError.isOperational = true;
  }

  // 根据环境发送不同的错误响应
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(transformedError, req, res);
  } else {
    sendErrorProd(transformedError, req, res);
  }
};

/**
 * 404 错误处理中间件
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 * @param {Function} next - 下一个中间件函数
 */
const notFoundHandler = (req, res, next) => {
  const error = new AppError(`路径 ${req.originalUrl} 未找到`, 404, "ROUTE_NOT_FOUND");
  next(error);
};

/**
 * 未捕获异常处理器
 */
const handleUncaughtException = () => {
  process.on("uncaughtException", (error) => {
    logError("Uncaught Exception", error, {
      type: "uncaughtException",
      timestamp: new Date().toISOString()
    });

    // 优雅地关闭进程
    console.log("Uncaught Exception! Shutting down...");
    process.exit(1);
  });
};

/**
 * 未处理的Promise拒绝处理器
 */
const handleUnhandledRejection = () => {
  process.on("unhandledRejection", (reason, promise) => {
    logError("Unhandled Rejection", new Error(reason), {
      type: "unhandledRejection",
      promise: promise.toString(),
      timestamp: new Date().toISOString()
    });

    // 优雅地关闭进程
    console.log("Unhandled Rejection! Shutting down...");
    process.exit(1);
  });
};

module.exports = {
  AppError,
  asyncErrorHandler,
  globalErrorHandler,
  notFoundHandler,
  handleUncaughtException,
  handleUnhandledRejection,
  handleDatabaseError,
  handleJWTError,
  handleValidationError
};
