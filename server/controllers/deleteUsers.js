// 控制器模块
const { pool } = require("../config/db-connection.js");
const { verifyToken, formatTime } = require("../utils/utils.js");
const { logInfo, logError, logWarning, logDbOperation } = require("../config/logger");

/**
 * 获取删除的用户列表接口
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const getDeletedUsers = async (req, res) => {
  try {
    logInfo("Get deleted users request", {
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent"),
      query: req.query
    });

    // JWT token验证
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logWarning("Get deleted users failed - no token", {
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(401).json({
        status: 401,
        message: "用户未登录"
      });
    }

    // 验证token
    const decoded = await verifyToken(token);
    logInfo("JWT verification successful for deleted users", {
      userId: decoded.id,
      username: decoded.user_name
    });

    const { pageNum = 1, pageSize = 10, keywords, startTime, endTime } = req.query;

    // 确保分页参数是数字类型
    const pageNumber = parseInt(pageNum, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const offset = (pageNumber - 1) * pageSizeNumber;

    // 构建查询条件
    let whereConditions = "WHERE is_delete = 1";
    const queryParams = [];

    if (keywords) {
      whereConditions += " AND (user_name LIKE ? OR description LIKE ?)";
      const keywordPattern = `%${keywords}%`;
      queryParams.push(keywordPattern, keywordPattern);
    }

    if (startTime && endTime) {
      whereConditions += " AND create_time BETWEEN ? AND ?";
      queryParams.push(startTime, endTime);
    }

    // 构建查询语句
    const query = `SELECT * FROM users ${whereConditions} ORDER BY create_time DESC LIMIT ?, ?`;
    const countQuery = `SELECT COUNT(*) AS total FROM users ${whereConditions}`;

    // 添加分页参数 - 确保是数字类型 (MySQL LIMIT语法: LIMIT offset, count)
    const mainQueryParams = [...queryParams, offset, pageSizeNumber];

    logInfo("Executing deleted users queries", {
      query: query,
      countQuery: countQuery,
      mainParamsLength: mainQueryParams.length,
      countParamsLength: queryParams.length
    });

    // 使用Promise包装query方法
    const executePoolQuery = (sql, params) => {
      return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    // 并行执行查询和计数
    const queryStartTime = Date.now();
    const [results, countResults] = await Promise.all([
      executePoolQuery(query, mainQueryParams),
      executePoolQuery(countQuery, queryParams)
    ]);
    const queryDuration = Date.now() - queryStartTime;

    logDbOperation(
      "SELECT",
      "users",
      {
        deletedUsers: true,
        count: results.length,
        total: countResults[0].total
      },
      queryDuration
    );

    logInfo("Get deleted users successful", {
      returnedCount: results.length,
      total: countResults[0].total,
      page: pageNumber,
      pageSize: pageSizeNumber
    });

    // 格式化时间
    const formattedResults = results.map((user) => {
      return {
        ...user,
        update_time: formatTime(user.update_time),
        create_time: formatTime(user.create_time)
      };
    });

    const total = countResults[0].total;

    res.status(200).json({
      status: 200,
      message: "查询成功",
      page: pageNumber,
      pageSize: pageSizeNumber,
      total,
      data: formattedResults
    });
  } catch (error) {
    logError("Get deleted users failed", error, {
      ip: req.ip || req.connection.remoteAddress,
      query: req.query
    });

    // JWT验证失败
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      logWarning("Get deleted users failed - token error", {
        tokenError: error.name,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(403).json({
        status: 403,
        message: "登录过期，请重新登录"
      });
    }

    // 其他错误
    res.status(500).json({
      status: 500,
      message: "查询用户失败",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

/**
 * 完全删除用户接口
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const permanentDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    logInfo("Permanent delete user request", {
      userId: id,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });

    // JWT token验证
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logWarning("Permanent delete failed - no token", {
        userId: id,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(401).json({
        status: 401,
        message: "用户未登录"
      });
    }

    // 验证token
    const decoded = await verifyToken(token);
    logInfo("JWT verification successful for permanent delete", {
      operatorId: decoded.id,
      operatorName: decoded.user_name,
      targetUserId: id
    });

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "用户ID不能为空"
      });
    }

    const query = "DELETE FROM users WHERE id = ?";

    // 使用Promise包装query方法
    const executePoolQuery = (sql, params) => {
      return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    const deleteStartTime = Date.now();
    const results = await executePoolQuery(query, [parseInt(id, 10)]);
    const deleteDuration = Date.now() - deleteStartTime;

    logDbOperation("DELETE", "users", { userId: id, affectedRows: results.affectedRows }, deleteDuration);

    if (results.affectedRows === 0) {
      logWarning("Permanent delete failed - user not found", {
        userId: id
      });
      res.status(409).json({
        status: 409,
        message: "用户不存在"
      });
    } else {
      logInfo("Permanent delete successful", {
        userId: id,
        ip: req.ip || req.connection.remoteAddress
      });
      res.status(200).json({
        status: 200,
        message: "用户删除成功"
      });
    }
  } catch (error) {
    logError("Permanent delete user failed", error, {
      userId: id,
      ip: req.ip || req.connection.remoteAddress
    });

    // JWT验证失败
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(403).json({
        status: 403,
        message: "登录过期，请重新登录"
      });
    }

    // 其他错误
    res.status(500).json({
      status: 500,
      message: "删除用户失败"
    });
  }
};

/**
 * 还原删除用户接口
 * @param {Object} req - 请求对象
 * @param {Object} res - 响应对象
 */
const restoreUserApi = async (req, res) => {
  try {
    const { id } = req.params;

    logInfo("Restore user request", {
      userId: id,
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.get("User-Agent")
    });

    // JWT token验证
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logWarning("Restore user failed - no token", {
        userId: id,
        ip: req.ip || req.connection.remoteAddress
      });
      return res.status(401).json({
        status: 401,
        message: "用户未登录"
      });
    }

    // 验证token
    const decoded = await verifyToken(token);
    logInfo("JWT verification successful for restore", {
      operatorId: decoded.id,
      operatorName: decoded.user_name,
      targetUserId: id
    });

    if (!id) {
      return res.status(400).json({
        status: 400,
        message: "用户ID不能为空"
      });
    }

    const query = "UPDATE users SET is_delete = 0 WHERE id = ?";

    // 使用Promise包装query方法
    const executePoolQuery = (sql, params) => {
      return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    const restoreStartTime = Date.now();
    const results = await executePoolQuery(query, [parseInt(id, 10)]);
    const restoreDuration = Date.now() - restoreStartTime;

    logDbOperation(
      "UPDATE",
      "users",
      { userId: id, restore: true, affectedRows: results.affectedRows },
      restoreDuration
    );

    if (results.affectedRows === 0) {
      logWarning("Restore user failed - user not found", {
        userId: id
      });
      res.status(409).json({
        status: 409,
        message: "用户不存在或已被永久删除"
      });
    } else {
      logInfo("Restore user successful", {
        userId: id,
        ip: req.ip || req.connection.remoteAddress
      });
      res.status(200).json({
        status: 200,
        message: "用户还原成功"
      });
    }
  } catch (error) {
    logError("Restore user failed", error, {
      userId: id,
      ip: req.ip || req.connection.remoteAddress
    });

    // JWT验证失败
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(403).json({
        status: 403,
        message: "登录过期，请重新登录"
      });
    }

    // 其他错误
    res.status(500).json({
      status: 500,
      message: "还原用户失败"
    });
  }
};

module.exports = {
  getDeletedUsers,
  permanentDeleteUser,
  restoreUserApi
};
