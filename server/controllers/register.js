const { hashPassword, formatTime, generateUUID } = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");
const { logInfo, logError, logWarning, logDbOperation, logDbError } = require("../config/logger");

const registerUser = (req, res) => {
  const { user_name, password, confirmPassword, description, roles } = req.body;

  logInfo("User registration attempt", {
    username: user_name,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("User-Agent")
  });

  // 检查必填字段
  if (!user_name || !password || !confirmPassword) {
    logWarning("Registration failed - missing required fields", {
      username: user_name,
      ip: req.ip || req.connection.remoteAddress
    });
    return res.status(400).json({ status: 400, message: "用户名、密码和确认密码为必填项" });
  }

  // 检查密码是否一致
  if (password !== confirmPassword) {
    logWarning("Registration failed - password mismatch", {
      username: user_name,
      ip: req.ip || req.connection.remoteAddress
    });
    return res.status(400).json({ status: 400, message: "密码和确认密码不一致" });
  }
  // 生成 UUID
  const uuid = generateUUID();
  // 检查用户是否已存在
  const checkUserQuery = "SELECT * FROM users WHERE user_name = ?";
  const checkStartTime = Date.now();

  connection.query(checkUserQuery, [user_name], async (err, results) => {
    const checkDuration = Date.now() - checkStartTime;

    if (err) {
      logDbError("SELECT", "users", err, checkUserQuery);
      logError("Registration failed - database check error", err, {
        username: user_name
      });
      return res.status(500).json({ status: 500, message: "数据库查询失败", error: err });
    }

    logDbOperation("SELECT", "users", { username: user_name, count: results.length }, checkDuration);

    if (results.length > 0) {
      logWarning("Registration failed - username already exists", {
        username: user_name,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(409).json({ status: 409, message: "该用户名已被注册，请选择其他用户名" });
    }

    // 默认值
    const create_time = formatTime();
    const update_time = formatTime();
    const account = user_name;
    const is_delete = 0;
    const nick_name = "新用户"; // 默认昵称
    const role_ids = [201]; // 普通用户角色ID
    const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";

    // 密码加密
    try {
      const hashedPassword = await hashPassword(password);

      // 插入用户数据
      const insertUserQuery = `
        INSERT INTO users
        (uuid, account, create_time, is_delete, password, update_time, description, user_name, nick_name, role_ids, avatar, roles)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        uuid,
        account,
        create_time,
        is_delete,
        hashedPassword,
        update_time,
        description || "",
        user_name,
        nick_name,
        JSON.stringify(role_ids),
        avatar,
        JSON.stringify(roles || [])
      ];

      const insertStartTime = Date.now();
      connection.query(insertUserQuery, values, (err, results) => {
        const insertDuration = Date.now() - insertStartTime;

        if (err) {
          logDbError("INSERT", "users", err, insertUserQuery);
          logError("Registration failed - database insert error", err, {
            username: user_name
          });
          return res.status(500).json({ status: 500, message: "注册失败", error: err });
        }

        logDbOperation("INSERT", "users", { username: user_name, id: results.insertId }, insertDuration);

        logInfo("User registration successful", {
          username: user_name,
          userId: results.insertId,
          ip: req.ip || req.connection.remoteAddress
        });

        res.status(200).json({ status: 200, message: "注册成功", data: results });
      });
    } catch (error) {
      logError("Registration failed - password hashing error", error, {
        username: user_name
      });
      res.status(500).json({ status: 500, message: "注册过程中发生错误", error });
    }
  });
};

module.exports = {
  registerUser
};
