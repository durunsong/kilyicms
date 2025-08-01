/**
 * 安全中间件配置
 * 包含 Helmet 安全头设置、速率限制、IP 过滤等安全功能
 */
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { logWarning, logInfo } = require("../config/logger");

/**
 * Helmet 安全配置
 * 设置各种 HTTP 安全头
 */
const helmetConfig = helmet({
  // 内容安全策略
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "https:", "http:"],
      connectSrc: ["'self'", "https:", "wss:"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"]
    }
  },
  // 跨域嵌入保护
  crossOriginEmbedderPolicy: false,
  // HSTS (HTTP Strict Transport Security)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  // 防止 MIME 类型嗅探
  noSniff: true,
  // 防止点击劫持
  frameguard: { action: "deny" },
  // XSS 过滤器
  xssFilter: true,
  // 隐藏 X-Powered-By 头
  hidePoweredBy: true,
  // 引荐来源策略
  referrerPolicy: { policy: "same-origin" }
});

/**
 * 通用速率限制配置
 * 限制所有请求的频率
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 1000, // 每个IP每15分钟最多1000个请求
  message: {
    status: 429,
    message: "请求过于频繁，请稍后再试",
    retryAfter: Math.ceil(15 * 60) // 重试等待时间（秒）
  },
  standardHeaders: true, // 返回速率限制信息在 `RateLimit-*` 头中
  legacyHeaders: false, // 禁用 `X-RateLimit-*` 头
  // 自定义密钥生成器（可基于用户ID而不仅仅是IP）
  keyGenerator: (req) => {
    return req.user?.id ? `user_${req.user.id}` : req.ip;
  },
  // 跳过某些请求
  skip: (req) => {
    // 跳过健康检查和静态资源
    return req.path === "/health" || req.path.startsWith("/public");
  },
  // 使用新的handler方式替代onLimitReached
  handler: (req, res, next, options) => {
    logWarning("Rate limit reached", {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      path: req.path,
      userId: req.user?.id || "anonymous"
    });

    res.status(options.statusCode).json(options.message);
  }
});

/**
 * 登录接口严格速率限制
 * 防止暴力破解攻击
 */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 分钟
  max: 5, // 每个IP每15分钟最多5次登录尝试
  message: {
    status: 429,
    message: "登录尝试过于频繁，请15分钟后再试",
    retryAfter: Math.ceil(15 * 60)
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
  handler: (req, res, next, options) => {
    logWarning("Login rate limit reached", {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      loginAttempt: req.body?.user_name || "unknown"
    });

    res.status(options.statusCode).json(options.message);
  }
});

/**
 * 注册接口速率限制
 * 防止批量注册
 */
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 小时
  max: 3, // 每个IP每小时最多3次注册
  message: {
    status: 429,
    message: "注册过于频繁，请1小时后再试",
    retryAfter: Math.ceil(60 * 60)
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    logWarning("Register rate limit reached", {
      ip: req.ip,
      userAgent: req.get("User-Agent"),
      registerAttempt: req.body?.user_name || "unknown"
    });

    res.status(options.statusCode).json(options.message);
  }
});

/**
 * API 接口速率限制
 * 限制API调用频率
 */
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 分钟
  max: 60, // 每个IP每分钟最多60个API请求
  message: {
    status: 429,
    message: "API调用过于频繁，请稍后再试",
    retryAfter: Math.ceil(1 * 60)
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.id ? `api_user_${req.user.id}` : `api_ip_${req.ip}`;
  },
  handler: (req, res, next, options) => {
    logWarning("API rate limit reached", {
      ip: req.ip,
      path: req.path,
      userId: req.user?.id || "anonymous"
    });

    res.status(options.statusCode).json(options.message);
  }
});

/**
 * IP 白名单中间件
 * 只允许特定IP访问某些敏感接口
 */
const ipWhitelist = (allowedIPs = []) => {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress;

    // 如果没有配置白名单，则允许所有IP
    if (allowedIPs.length === 0) {
      return next();
    }

    // 检查IP是否在白名单中
    const isAllowed = allowedIPs.some((allowedIP) => {
      // 支持CIDR notation或者精确匹配
      if (allowedIP.includes("/")) {
        // TODO: 实现CIDR匹配逻辑
        return false;
      }
      return clientIP === allowedIP;
    });

    if (!isAllowed) {
      logWarning("IP not in whitelist", {
        ip: clientIP,
        path: req.path,
        userAgent: req.get("User-Agent")
      });

      return res.status(403).json({
        status: 403,
        message: "访问被拒绝",
        timestamp: new Date().toISOString()
      });
    }

    next();
  };
};

/**
 * 请求大小限制中间件
 * 防止过大的请求体导致服务器资源耗尽
 */
const requestSizeLimit = (maxSize = "10mb") => {
  return (req, res, next) => {
    const contentLength = req.get("Content-Length");

    if (contentLength) {
      const maxSizeBytes = parseMaxSize(maxSize);
      if (parseInt(contentLength) > maxSizeBytes) {
        logWarning("Request too large", {
          ip: req.ip,
          path: req.path,
          contentLength: contentLength,
          maxSize: maxSize
        });

        return res.status(413).json({
          status: 413,
          message: "请求数据过大",
          maxSize: maxSize,
          timestamp: new Date().toISOString()
        });
      }
    }

    next();
  };
};

/**
 * 解析大小字符串为字节数
 * @param {string} sizeStr - 大小字符串，如 '10mb'
 * @returns {number} 字节数
 */
const parseMaxSize = (sizeStr) => {
  const units = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024
  };

  const match = sizeStr.toLowerCase().match(/^(\d+(?:\.\d+)?)\s*(b|kb|mb|gb)?$/);
  if (!match) return 1024 * 1024; // 默认1MB

  const value = parseFloat(match[1]);
  const unit = match[2] || "b";

  return Math.floor(value * units[unit]);
};

/**
 * 安全头信息记录中间件
 * 记录可疑的请求头信息
 */
const securityHeadersLogger = (req, res, next) => {
  const suspiciousHeaders = [];

  // 检查可疑的User-Agent
  const userAgent = req.get("User-Agent");
  if (!userAgent || userAgent.includes("bot") || userAgent.includes("crawler")) {
    suspiciousHeaders.push({ header: "User-Agent", value: userAgent });
  }

  // 检查可疑的Referer
  const referer = req.get("Referer");
  if (referer && !referer.includes(req.get("Host"))) {
    suspiciousHeaders.push({ header: "Referer", value: referer });
  }

  // 检查X-Forwarded-For头（可能表示代理或VPN）
  const xForwardedFor = req.get("X-Forwarded-For");
  if (xForwardedFor) {
    suspiciousHeaders.push({ header: "X-Forwarded-For", value: xForwardedFor });
  }

  // 如果发现可疑头信息，记录日志
  if (suspiciousHeaders.length > 0) {
    logInfo("Suspicious request headers detected", {
      ip: req.ip,
      path: req.path,
      method: req.method,
      suspiciousHeaders: suspiciousHeaders,
      timestamp: new Date().toISOString()
    });
  }

  next();
};

module.exports = {
  helmetConfig,
  generalLimiter,
  loginLimiter,
  registerLimiter,
  apiLimiter,
  ipWhitelist,
  requestSizeLimit,
  securityHeadersLogger,
  parseMaxSize
};
