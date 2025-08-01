const { connection } = require("../config/db-connection.js");
const { verifyToken } = require("../utils/utils.js");
const { logInfo, logError, logWarning, logDbOperation, logDbError } = require("../config/logger");

// 获取用户详情接口
const getUserDetails = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // 从请求头获取 token

  logInfo("Get user details request", {
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent"),
    hasToken: !!token
  });

  if (!token) {
    logWarning("Get user details failed - no token", {
      ip: req.ip || req.connection.remoteAddress
    });
    return res.status(401).json({ message: "用户未登录" });
  }

  try {
    // 验证并解码 JWT
    const decoded = await verifyToken(token);
    const userId = decoded.id; // 获取解码后的用户 ID

    logInfo("JWT verification successful", {
      userId: userId,
      username: decoded.user_name
    });

    // 使用 ID 查询用户详情
    const findUserQuery = "SELECT * FROM users WHERE id = ? AND is_delete = 0";
    const startTime = Date.now();

    connection.query(findUserQuery, [userId], (err, results) => {
      const queryDuration = Date.now() - startTime;

      if (err) {
        logDbError("SELECT", "users", err, findUserQuery);
        logError("Get user details failed - database error", err, {
          userId: userId
        });
        return res.status(500).json({ message: "查询用户失败" });
      }

      logDbOperation("SELECT", "users", { userId: userId, count: results.length }, queryDuration);

      if (results.length === 0) {
        logWarning("Get user details failed - user not found", {
          userId: userId
        });
        return res.status(409).json({ message: "用户不存在" });
      }

      const user = results[0];
      const userInfo = {
        id: user.id,
        user_name: user.user_name,
        account: user.account,
        avatar: user.avatar,
        description: user.description,
        create_time: user.create_time,
        update_time: user.update_time,
        is_delete: user.is_delete,
        nick_name: user.nick_name,
        role_ids: user.role_ids,
        roles: user.roles
      };

      logInfo("Get user details successful", {
        userId: user.id,
        username: user.user_name
      });

      res.status(200).json({ message: "获取用户信息成功", status: 200, userInfo });
    });
  } catch (error) {
    logError("JWT verification failed", error, {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });
    return res.status(403).json({ message: "登录过期，请重新登录" });
  }
};

module.exports = {
  getUserDetails
};
