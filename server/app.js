/**
 * 引入模块依赖
 */
const app = require("./bin/index");
const debug = require("debug")("kilyicms_server:server");
const http = require("http");

/**
 * 从环境变量中获取端口号，如果未定义则使用默认端口 4000
 */
const port = normalizePort(process.env.PORT || "4000");

/**
 * 检查端口是否被占用
 */
const checkPortAvailable = (port) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer();

    server.listen(port, () => {
      server.close(() => {
        resolve(true);
      });
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        resolve(false);
      } else {
        reject(err);
      }
    });
  });
};

/**
 * 启动服务器
 */
const startServer = async () => {
  try {
    // 检查端口是否可用
    const isPortAvailable = await checkPortAvailable(port);

    if (!isPortAvailable) {
      console.error(`❌ 端口 ${port} 已被占用`);
      console.log("🔍 正在查找占用该端口的进程...");

      // 尝试查找其他可用端口
      let availablePort = port;
      for (let i = 1; i <= 10; i++) {
        const testPort = port + i;
        if (await checkPortAvailable(testPort)) {
          availablePort = testPort;
          console.log(`✅ 找到可用端口: ${availablePort}`);
          break;
        }
      }

      if (availablePort === port) {
        console.error("❌ 无法找到可用端口");
        process.exit(1);
      }

      app.set("port", availablePort);
    } else {
      app.set("port", port);
    }

    /**
     * 创建 HTTP 服务器
     */
    const server = http.createServer(app);
    const finalPort = app.get("port");

    /**
     * 监听指定端口，启动服务器
     */
    server.listen(finalPort, () => {
      console.log(`🚀 服务器成功启动！`);
      console.log(`📡 访问地址: http://localhost:${finalPort}`);
      console.log(`💚 健康检查: http://localhost:${finalPort}/health`);
      console.log(`🧪 测试接口: http://localhost:${finalPort}/test`);
      console.log("==================================================");
    });

    server.on("error", onError);
    server.on("listening", onListening);

    // 优雅关闭处理
    const gracefulShutdown = (signal) => {
      console.log(`\n📴 收到 ${signal} 信号，正在优雅关闭服务器...`);

      server.close((err) => {
        if (err) {
          console.error("❌ 服务器关闭时出错:", err);
          process.exit(1);
        }

        console.log("✅ 服务器已关闭");
        process.exit(0);
      });

      // 强制退出定时器
      setTimeout(() => {
        console.error("⚠️ 强制退出服务器");
        process.exit(1);
      }, 10000);
    };

    // 监听关闭信号
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    console.error("❌ 服务器启动失败:", error.message);
    process.exit(1);
  }
};

/**
 * 将端口规范化为数字、字符串或 false
 * @param {string|number} val - 输入的端口值
 * @returns {number|string|boolean} - 规范化后的端口
 */
function normalizePort(val) {
  const port = parseInt(val, 10);
  // 检查是否为有效端口号
  if (isNaN(port)) {
    // 不是数字则返回原始字符串（如命名管道）
    return val;
  }
  if (port >= 0) {
    // 有效端口号
    return port;
  }
  return false; // 无效端口
}

/**
 * 处理服务器启动过程中的错误
 * @param {Error} error - 错误对象
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  // 用友好信息处理特定的监听错误
  switch (error.code) {
    case "EACCES":
      console.error(`❌ ${bind} 需要管理员权限`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`❌ ${bind} 已被占用`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 *  HTTP 服务器 "监听 "事件的事件监听器。
 */
function onListening() {
  const addr = app.get("port");
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr;
  debug("Listening on " + bind);
}

// 启动服务器
startServer();

/**
 * @vercel部署需要这样写
 */
module.exports = app;
