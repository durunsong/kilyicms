const { hashPassword, generateUUID, formatTime, verifyToken } = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");
const { logInfo, logError, logWarning, logDbOperation, logDbError } = require("../config/logger");

// 添加用户接口
const createUser = async (req, res) => {
  try {
    const { user_name, password, description, roles } = req.body;

    logInfo("Create user request", {
      username: user_name,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });
    const create_time = formatTime();
    const update_time = formatTime();
    const account = "testuser";
    const is_delete = 0;
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    const uuid = generateUUID();
    // 查重
    const checkQuery = "SELECT * FROM users WHERE user_name = ?";
    const checkStartTime = Date.now();

    connection.query(checkQuery, [user_name], async (err, results) => {
      const checkDuration = Date.now() - checkStartTime;

      if (err) {
        logDbError("SELECT", "users", err, checkQuery);
        logError("Create user failed - check query error", err, {
          username: user_name
        });
        return res.status(500).json({ status: 500, message: "查询失败", error: err });
      }

      logDbOperation("SELECT", "users", { username: user_name, count: results.length }, checkDuration);

      if (results.length > 0) {
        logWarning("Create user failed - username exists", {
          username: user_name,
          ip: req.ip || req.connection.remoteAddress
        });
        return res.status(400).json({ status: 400, message: "用户名已存在，请换个名字试试" });
      }
      // 密码加密
      const hashedPassword = await hashPassword(password);
      const query = `INSERT INTO users
                (uuid, account, create_time, is_delete, password, update_time, description, user_name, nick_name, role_ids, avatar, roles)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        uuid,
        account,
        create_time,
        is_delete,
        hashedPassword,
        update_time,
        description,
        user_name,
        nick_name,
        JSON.stringify(role_ids),
        avatar,
        JSON.stringify(roles)
      ];
      const insertStartTime = Date.now();
      connection.query(query, values, (err, results) => {
        const insertDuration = Date.now() - insertStartTime;

        if (err) {
          logDbError("INSERT", "users", err, query);
          logError("Create user failed - insert error", err, {
            username: user_name
          });
          return res.status(500).json({ status: 500, message: "创建失败", error: err });
        }

        logDbOperation("INSERT", "users", { username: user_name, id: results.insertId }, insertDuration);
        logInfo("Create user successful", {
          username: user_name,
          userId: results.insertId,
          ip: req.ip || req.connection.remoteAddress
        });

        res.status(200).json({ status: 200, message: "创建成功", data: results });
      });
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "服务器错误", error });
  }
};

// 获取用户列表接口
const getUsers = async (req, res) => {
  try {
    logInfo("Get users list request", {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
      query: req.query
    });

    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logWarning("Get users failed - no authorization", {
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(401).json({ status: 401, message: "登录过期，请重新登录" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token, "jwt_secret");

    logInfo("JWT verification successful for user list", {
      userId: decoded.id,
      username: decoded.user_name
    });
    const { pageNum, pageSize, keywords, startTime, endTime } = req.query;
    const offset = (pageNum - 1) * pageSize;
    let query = "SELECT * FROM users WHERE is_delete = 0";
    let countQuery = "SELECT COUNT(*) AS total FROM users WHERE is_delete = 0";
    const queryParams = [];
    if (keywords) {
      query += " AND (user_name LIKE ? OR description LIKE ?)";
      countQuery += " AND (user_name LIKE ? OR description LIKE ?)";
      const keywordPattern = `%${keywords}%`;
      queryParams.push(keywordPattern, keywordPattern);
    }
    if (startTime && endTime) {
      query += " AND create_time BETWEEN ? AND ?";
      countQuery += " AND create_time BETWEEN ? AND ?";
      queryParams.push(startTime, endTime);
    }
    query += " LIMIT ?, ?";
    queryParams.push(parseInt(offset), parseInt(pageSize));

    const queryStartTime = Date.now();
    connection.query(query, queryParams, (err, results) => {
      const queryDuration = Date.now() - queryStartTime;

      if (err) {
        logDbError("SELECT", "users", err, query);
        logError("Get users failed - database error", err);
        return res.status(500).json({ status: 500, message: "查询用户失败" });
      }

      logDbOperation("SELECT", "users", { count: results.length }, queryDuration);
      const formattedResults = results.map((user) => {
        user.update_time = formatTime(user.update_time);
        user.create_time = formatTime(user.create_time);
        return user;
      });
      const countStartTime = Date.now();
      connection.query(countQuery, queryParams.slice(0, queryParams.length - 2), (countErr, countResults) => {
        const countDuration = Date.now() - countStartTime;

        if (countErr) {
          logDbError("SELECT", "users", countErr, countQuery);
          logError("Get users count failed - database error", countErr);
          return res.status(500).json({ status: 500, message: "查询用户总数失败" });
        }

        const total = countResults[0].total;
        logDbOperation("SELECT", "users", { countQuery: true, total: total }, countDuration);

        logInfo("Get users list successful", {
          total: total,
          page: parseInt(pageNum),
          pageSize: parseInt(pageSize),
          returnedCount: formattedResults.length
        });

        res.status(200).json({
          status: 200,
          message: "查询成功",
          page: parseInt(pageNum),
          pageSize: parseInt(pageSize),
          total,
          data: formattedResults
        });
      });
    });
  } catch (error) {
    res.status(401).json({ status: 401, message: "登录过期，请重新登录", error });
  }
};

// 更新用户接口
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, password, description, roles } = req.body;

    logInfo("Update user request", {
      userId: id,
      username: user_name,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });
    const update_time = formatTime();
    // 默认数据
    const account = "testuser";
    const is_delete = 0;
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    // 加密密码
    const hashedPassword = await hashPassword(password);
    const query = `UPDATE users SET
          account = ?, is_delete = ?, password = ?, update_time = ?, description = ?, user_name = ?,
          nick_name = ?, role_ids = ?, avatar = ?, roles = ?
          WHERE id = ?`;
    const values = [
      account,
      is_delete,
      hashedPassword,
      update_time,
      description,
      user_name,
      nick_name,
      JSON.stringify(role_ids),
      avatar,
      JSON.stringify(roles),
      id
    ];
    const updateStartTime = Date.now();
    connection.query(query, values, (err, results) => {
      const updateDuration = Date.now() - updateStartTime;

      if (err) {
        logDbError("UPDATE", "users", err, query);
        logError("Update user failed - database error", err, {
          userId: id,
          username: user_name
        });
        return res.status(500).json({ status: 500, message: "更新失败", error: err });
      }

      logDbOperation("UPDATE", "users", { userId: id, affectedRows: results.affectedRows }, updateDuration);

      if (results.affectedRows === 0) {
        logWarning("Update user failed - user not found", {
          userId: id
        });
        return res.status(409).json({ status: 409, message: "用户不存在" });
      }

      logInfo("Update user successful", {
        userId: id,
        username: user_name,
        ip: req.ip || req.connection.remoteAddress
      });

      res.status(200).json({ status: 200, message: "更新成功", data: results });
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "服务器错误", error });
  }
};

// 删除用户（软删除）接口
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    logInfo("Delete user request", {
      userId: id,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });

    // 验证JWT token
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logWarning("Delete user failed - no authorization", {
        userId: id,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(401).json({ status: 401, message: "登录过期，请重新登录" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = await verifyToken(token, "jwt_secret");

    logInfo("JWT verification successful for delete user", {
      currentUserId: decoded.id,
      targetUserId: id,
      username: decoded.user_name
    });

    // 检查是否尝试删除自己的账户
    if (parseInt(id) === decoded.id) {
      logWarning("Delete user failed - attempting to delete own account", {
        userId: decoded.id,
        username: decoded.user_name,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(403).json({ status: 403, message: "不能删除当前登录用户" });
    }

    const query = "UPDATE users SET is_delete = 1 WHERE id = ?";
    const deleteStartTime = Date.now();

    connection.query(query, [id], (err, results) => {
      const deleteDuration = Date.now() - deleteStartTime;

      if (err) {
        logDbError("UPDATE", "users", err, query);
        logError("Delete user failed - database error", err, {
          userId: id
        });
        return res.status(500).json({ status: 500, message: "删除用户失败", error: err });
      }

      logDbOperation(
        "UPDATE",
        "users",
        { userId: id, softDelete: true, affectedRows: results.affectedRows },
        deleteDuration
      );

      if (results.affectedRows === 0) {
        logWarning("Delete user failed - user not found", {
          userId: id
        });
        return res.status(409).json({ status: 409, message: "用户不存在" });
      }

      logInfo("Delete user successful", {
        userId: id,
        deletedBy: decoded.id,
        deletedByUsername: decoded.user_name,
        ip: req.ip || req.connection.remoteAddress
      });

      res.status(200).json({ status: 200, message: "用户删除成功" });
    });
  } catch (error) {
    logError("Delete user failed - JWT verification error", error, {
      userId: req.params.id,
      ip: req.ip || req.connection.remoteAddress
    });
    res.status(401).json({ status: 401, message: "登录过期，请重新登录", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
};
