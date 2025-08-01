/**
 * 数据库连接配置模块 - 优化版
 * 使用连接池提高性能，添加日志记录和错误处理
 */
const mysql = require("mysql2");
const { logInfo, logError, logDbOperation, logDbError } = require("./logger");

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "test",
  port: process.env.DB_PORT || 3306,

  // 连接池配置 (移除不兼容的选项)
  connectionLimit: 10, // 最大连接数
  queueLimit: 0, // 队列中等待连接的最大数量，0为无限制

  // 字符集配置
  charset: "utf8mb4",

  // 时区配置
  timezone: "+08:00",

  // 连接检查配置
  dateStrings: true, // 将日期作为字符串返回
  supportBigNumbers: true, // 支持大数字
  bigNumberStrings: true, // 将大数字作为字符串返回

  // 允许多条SQL语句
  multipleStatements: true
};

// 创建连接池
let pool;
let connection; // 保持向后兼容

/**
 * 初始化数据库连接池
 */
const initializePool = () => {
  try {
    pool = mysql.createPool(dbConfig);

    // 获取单个连接用于向后兼容
    connection = pool;

    // 监听连接池事件
    pool.on("connection", (connection) => {
      logInfo("Database connection established", {
        connectionId: connection.threadId,
        host: dbConfig.host,
        database: dbConfig.database
      });
    });

    pool.on("error", (err) => {
      logError("Database pool error", err, {
        host: dbConfig.host,
        database: dbConfig.database
      });

      // 处理连接丢失
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        logInfo("Database connection lost, attempting to reconnect...");
        setTimeout(initializePool, 2000);
      }
    });

    logInfo("Database pool initialized successfully", {
      host: dbConfig.host,
      database: dbConfig.database,
      connectionLimit: dbConfig.connectionLimit
    });
  } catch (error) {
    logError("Failed to initialize database pool", error, {
      host: dbConfig.host,
      database: dbConfig.database
    });
    throw error;
  }
};

/**
 * 连接数据库（保持向后兼容）
 */
const connectDb = async () => {
  try {
    if (!pool) {
      initializePool();
    }

    // 测试连接
    await testConnection();
    logInfo("Database connected successfully");
  } catch (error) {
    logError("Database connection failed", error);
    throw error;
  }
};

/**
 * 测试数据库连接
 */
const testConnection = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }

      connection.ping((pingErr) => {
        connection.release(); // 释放连接回池中

        if (pingErr) {
          reject(pingErr);
        } else {
          resolve();
        }
      });
    });
  });
};

/**
 * 执行查询的包装函数，添加日志记录和性能监控
 * @param {string} sql - SQL查询语句
 * @param {Array} params - 查询参数
 * @param {string} operation - 操作类型 (SELECT, INSERT, UPDATE, DELETE)
 * @param {string} table - 表名
 * @returns {Promise} 查询结果
 */
const executeQuery = (sql, params = [], operation = "UNKNOWN", table = "unknown") => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    pool.execute(sql, params, (error, results, _fields) => {
      const duration = Date.now() - startTime;

      if (error) {
        // 记录数据库错误日志
        logDbError(operation, table, error, sql);
        reject(error);
      } else {
        // 记录成功的数据库操作
        const resultData = Array.isArray(results) ? { count: results.length } : results;
        logDbOperation(operation, table, resultData, duration);

        // 记录慢查询警告
        if (duration > 1000) {
          // 超过1秒的查询
          logError("Slow query detected", new Error("Slow query"), {
            sql: sql.substring(0, 200),
            duration: `${duration}ms`,
            table,
            operation
          });
        }

        resolve(results);
      }
    });
  });
};

/**
 * 获取连接池状态信息
 */
const getPoolStatus = () => {
  if (!pool) {
    return { status: "not_initialized" };
  }

  return {
    status: "active",
    connectionLimit: pool.config.connectionLimit,
    acquiredConnections: pool._acquiredConnections ? pool._acquiredConnections.length : 0,
    availableConnections: pool._freeConnections ? pool._freeConnections.length : 0,
    queuedRequests: pool._connectionQueue ? pool._connectionQueue.length : 0
  };
};

/**
 * 事务处理包装器
 * @param {Function} transactionFn - 事务函数
 * @returns {Promise} 事务结果
 */
const executeTransaction = async (transactionFn) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        logError("Failed to get connection for transaction", err);
        reject(err);
        return;
      }

      connection.beginTransaction(async (beginErr) => {
        if (beginErr) {
          connection.release();
          logError("Failed to begin transaction", beginErr);
          reject(beginErr);
          return;
        }

        try {
          const result = await transactionFn(connection);

          connection.commit((commitErr) => {
            if (commitErr) {
              connection.rollback(() => {
                connection.release();
                logError("Failed to commit transaction", commitErr);
                reject(commitErr);
              });
            } else {
              connection.release();
              logInfo("Transaction committed successfully");
              resolve(result);
            }
          });
        } catch (transactionError) {
          connection.rollback(() => {
            connection.release();
            logError("Transaction failed, rolled back", transactionError);
            reject(transactionError);
          });
        }
      });
    });
  });
};

/**
 * 优雅关闭数据库连接池
 */
const closePool = () => {
  return new Promise((resolve) => {
    if (pool) {
      pool.end(() => {
        logInfo("Database pool closed successfully");
        resolve();
      });
    } else {
      resolve();
    }
  });
};

/**
 * 数据库健康检查
 */
const healthCheck = async () => {
  try {
    await testConnection();
    const status = getPoolStatus();

    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      pool: status,
      config: {
        host: dbConfig.host,
        database: dbConfig.database,
        connectionLimit: dbConfig.connectionLimit
      }
    };
  } catch (error) {
    logError("Database health check failed", error);

    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
};

// 初始化连接池
initializePool();

// 进程退出时优雅关闭连接池
process.on("SIGINT", async () => {
  logInfo("Received SIGINT, closing database pool...");
  await closePool();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logInfo("Received SIGTERM, closing database pool...");
  await closePool();
  process.exit(0);
});

module.exports = {
  connection, // 保持向后兼容
  pool,
  connectDb,
  executeQuery,
  executeTransaction,
  testConnection,
  getPoolStatus,
  healthCheck,
  closePool
};
