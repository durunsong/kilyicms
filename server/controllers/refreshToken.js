const { generateToken, verifyToken } = require("../utils/utils.js");
const { logInfo, logError, logWarning } = require("../config/logger");

// 刷新 JWT 接口
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  logInfo("Token refresh request", {
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
    hasRefreshToken: !!refreshToken
  });

  if (!refreshToken) {
    logWarning("Token refresh failed - no refresh token", {
      ip: req.ip || req.connection.remoteAddress
    });
    return res.status(400).json({ message: "刷新令牌是必需的" });
  }

  try {
    // 验证刷新令牌
    const decoded = verifyToken(refreshToken);

    logInfo("Refresh token verification successful", {
      userId: decoded.userId,
      username: decoded.user_name
    });

    // 根据解码后的信息生成新的 JWT
    const newToken = generateToken({
      userId: decoded.userId,
      user_name: decoded.user_name
    });

    logInfo("New token generated successfully", {
      userId: decoded.userId,
      username: decoded.user_name,
      ip: req.ip || req.connection.remoteAddress
    });

    res.status(200).json({ token: newToken });
  } catch (err) {
    logError("Token refresh failed", err, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });
    res.status(403).json({ message: "无效的刷新令牌" });
  }
};

module.exports = {
  refreshToken
};
