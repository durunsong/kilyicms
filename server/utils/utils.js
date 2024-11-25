const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// 对密码进行加密
const hashPassword = async (password, saltRounds = 10) => {
  return bcrypt.hash(password, saltRounds);
};

/**
 * 验证密码
 * @param {string} plainPassword - 用户输入的明文密码
 * @param {string} hashedPassword - 数据库中存储的加密密码
 * @returns {Promise<boolean>} - 密码是否匹配
 */
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// 生成 UUID
const generateUUID = () => uuidv4();

// 格式化时间
const formatTime = (date = new Date(), format = "YYYY-MM-DD HH:mm:ss") => {
  return moment(date).format(format);
};

/**
 * 生成 JWT
 * @param {object} payload - 要编码的用户数据
 * @param {string} [expiresIn='1h'] - 令牌的有效期
 * @returns {string} - 生成的 JWT
 */
const generateToken = (payload, expiresIn = "1h") => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key";
  return jwt.sign(payload, secretKey, { expiresIn });
};

/**
 * 验证 JWT
 * @param {string} token - 待验证的 JWT
 * @returns {object} - 解码后的用户数据
 * @throws {Error} - 如果验证失败
 */
const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET || "default_secret_key"; // 确保有密钥
  return jwt.verify(token, secretKey); // 解码并验证
};

module.exports = {
  hashPassword,
  comparePassword,
  generateUUID,
  formatTime,
  generateToken,
  verifyToken,
};
