const { generateToken, verifyToken } = require("../utils/utils.js");

// 刷新 JWT 接口
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "刷新令牌是必需的" });
  }
  try {
    // 验证刷新令牌
    const decoded = verifyToken(refreshToken);
    // 根据解码后的信息生成新的 JWT
    const newToken = generateToken({
      userId: decoded.userId,
      user_name: decoded.user_name,
    });
    res.status(200).json({ token: newToken });
  } catch (err) {
    console.error("Error verifying refresh token:", err.message);
    res.status(403).json({ message: "无效的刷新令牌" });
  }
};

module.exports = {
  refreshToken,
};
