/**
 * 日志配置模块
 * 使用 Winston 进行结构化日志记录
 */
const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const path = require("path");

// 创建日志目录路径
const logDir = path.join(__dirname, "../logs");

// 定义日志格式
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss"
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;

    // 如果有额外的元数据，添加到日志中
    if (Object.keys(meta).length > 0) {
      log += ` | Meta: ${JSON.stringify(meta)}`;
    }

    return log;
  })
);

// 控制台输出格式（开发环境友好）
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: "HH:mm:ss"
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} ${level}: ${message}`;

    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }

    return log;
  })
);

// 错误日志文件配置
const errorFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  level: "error",
  handleExceptions: true,
  json: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: logFormat
});

// 综合日志文件配置
const combinedFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "combined-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  handleExceptions: true,
  json: true,
  maxSize: "20m",
  maxFiles: "30d",
  format: logFormat
});

// API访问日志文件配置
const accessFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "access-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  json: true,
  maxSize: "20m",
  maxFiles: "30d",
  format: logFormat
});

// 创建主要的 logger 实例
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: logFormat,
  defaultMeta: { service: "kilyicms-server" },
  transports: [errorFileTransport, combinedFileTransport],
  exitOnError: false
});

// 创建专门用于API访问日志的 logger
const accessLogger = winston.createLogger({
  level: "info",
  format: logFormat,
  defaultMeta: { type: "access" },
  transports: [accessFileTransport],
  exitOnError: false
});

// 在非生产环境下也输出到控制台
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat
    })
  );
}

// 创建数据库操作日志记录器
const dbLogger = winston.createLogger({
  level: "debug",
  format: logFormat,
  defaultMeta: { service: "database" },
  transports: [
    new DailyRotateFile({
      filename: path.join(logDir, "database-%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
      format: logFormat
    })
  ]
});

// 导出日志实例和工具函数
module.exports = {
  logger,
  accessLogger,
  dbLogger,

  // 日志工具函数
  logError: (message, error, meta = {}) => {
    logger.error(message, {
      error: error.message,
      stack: error.stack,
      ...meta
    });
  },

  logInfo: (message, meta = {}) => {
    logger.info(message, meta);
  },

  logWarning: (message, meta = {}) => {
    logger.warn(message, meta);
  },

  logDebug: (message, meta = {}) => {
    logger.debug(message, meta);
  },

  // API访问日志记录
  logApiAccess: (req, res, responseTime) => {
    accessLogger.info("API Access", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime: `${responseTime}ms`,
      userAgent: req.get("User-Agent"),
      ip: req.ip || req.connection.remoteAddress,
      userId: req.user?.id || "anonymous",
      timestamp: new Date().toISOString()
    });
  },

  // 数据库操作日志记录
  logDbOperation: (operation, table, data = {}, duration = null) => {
    dbLogger.info(`Database ${operation}`, {
      table,
      operation,
      duration: duration ? `${duration}ms` : null,
      data: operation === "SELECT" ? { count: data.count } : data,
      timestamp: new Date().toISOString()
    });
  },

  // 数据库错误日志记录
  logDbError: (operation, table, error, query = "") => {
    dbLogger.error(`Database Error - ${operation}`, {
      table,
      operation,
      error: error.message,
      sqlState: error.sqlState,
      errno: error.errno,
      query: query.substring(0, 200), // 只记录前200个字符避免日志过长
      timestamp: new Date().toISOString()
    });
  }
};
