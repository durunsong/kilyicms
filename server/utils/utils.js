// 临时处理bcrypt问题 - 如果bcrypt加载失败，使用简单的替代方案
let bcrypt;
let useFallback = false;

try {
  bcrypt = require("bcrypt");
  console.log("✅ bcrypt loaded successfully");
} catch {
  console.warn("⚠️ bcrypt loading failed, using fallback crypto method");
  console.warn("Note: This is NOT secure for production use!");
  useFallback = true;

  // 使用Node.js内置crypto作为临时替代
  const crypto = require("crypto");

  // 创建bcrypt兼容的替代对象
  bcrypt = {
    hash: async (password, _saltRounds = 10) => {
      // 简单的hash实现 - 仅用于开发测试
      const salt = crypto.randomBytes(16).toString("hex");
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
      return `${salt}:${hash}`;
    },

    compare: async (password, hashedPassword) => {
      try {
        const [salt, hash] = hashedPassword.split(":");
        const newHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
        return hash === newHash;
      } catch (error) {
        console.error("Password comparison error:", error);
        return false;
      }
    }
  };
}

const jwt = require("jsonwebtoken");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// 对密码进行加密
const hashPassword = async (password, saltRounds = 10) => {
  if (useFallback) {
    console.log("🔄 Using fallback password hashing");
  }
  return bcrypt.hash(password, saltRounds);
};

/**
 * 验证密码
 * @param {string} plainPassword - 用户输入的明文密码
 * @param {string} hashedPassword - 数据库中存储的加密密码
 * @returns {Promise<boolean>} - 密码是否匹配
 */
const comparePassword = async (password, hashedPassword) => {
  if (useFallback) {
    console.log("🔄 Using fallback password comparison");
  }
  return bcrypt.compare(password, hashedPassword);
};

/**
 * JWT生成token
 * @param {object} payload - 载荷
 * @param {string} secret - 密钥
 * @param {string} expiresIn - 过期时间
 * @returns {string} - token
 */
const generateToken = (payload, secret = "jwt_secret", expiresIn = "7d") => {
  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * 验证JWT token
 * @param {string} token - 要验证的token
 * @param {string} secret - 密钥
 * @returns {Promise<object>} - 解码后的payload
 */
const verifyToken = (token, secret = "jwt_secret") => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

/**
 * 时间格式化
 * @param {Date|string} time - 时间
 * @param {string} format - 格式
 * @returns {string} - 格式化后的时间
 */
const formatTime = (time = null, format = "YYYY-MM-DD HH:mm:ss") => {
  return time ? moment(time).format(format) : moment().format(format);
};

/**
 * UUID生成
 * @returns {string} - UUID
 */
const generateUUID = () => {
  return uuidv4();
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  formatTime,
  generateUUID,

  // 导出bcrypt状态信息用于调试
  isBcryptAvailable: !useFallback,
  isUsingFallback: useFallback
};
