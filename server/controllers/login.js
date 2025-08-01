const { comparePassword, formatTime, generateToken } = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");
const { logInfo, logError, logWarning, logDbOperation, logDbError } = require("../config/logger");

const loginUser = (req, res) => {
  const { user_name, password } = req.body;

  // 记录登录尝试
  logInfo("Login attempt", {
    username: user_name,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent")
  });

  if (!user_name || !password) {
    logWarning("Login failed - missing credentials", {
      username: user_name,
      ip: req.ip || req.connection.remoteAddress
    });
    return res.status(400).json({ status: 400, message: "账号和密码都是必需的" });
  }
  const findUserQuery = "SELECT * FROM users WHERE user_name = ? AND is_delete = 0";

  const startTime = Date.now();
  connection.query(findUserQuery, [user_name], async (err, results) => {
    const queryDuration = Date.now() - startTime;

    if (err) {
      logDbError("SELECT", "users", err, findUserQuery);
      logError("Login failed - database error", err, {
        username: user_name,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(500).json({ status: 500, message: "查询用户失败" });
    }

    logDbOperation("SELECT", "users", { username: user_name, count: results.length }, queryDuration);

    if (results.length === 0) {
      logWarning("Login failed - user not found", {
        username: user_name,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(409).json({ status: 409, message: "用户不存在" });
    }
    const user = results[0];
    const hashFromDb = user.password;
    // 验证密码
    const passWordMatch = await comparePassword(password, hashFromDb);
    if (!passWordMatch) {
      logWarning("Login failed - invalid password", {
        username: user_name,
        userId: user.id,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(409).json({ status: 409, message: "用户名或密码错误" });
    }

    // 生成 JWT
    const token = generateToken({ id: user.id, user_name: user.user_name });
    // 登录时间
    const login_time = formatTime();

    // 记录成功登录
    logInfo("Login successful", {
      userId: user.id,
      username: user.user_name,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });

    res.status(200).json({
      message: "登录成功",
      status: 200,
      token,
      login_time
    });
  });
};

module.exports = {
  loginUser
};
