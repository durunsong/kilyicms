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
app.set("port", port);

/**
 * 创建 HTTP 服务器
 */
const server = http.createServer(app);

/**
 * 监听指定端口，启动服务器
 */
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
server.on("error", onError);
server.on("listening", onListening);

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
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 *  HTTP 服务器 “监听 ”事件的事件监听器。
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

/**
 * @vercel部署需要这样写
 */
module.exports = app;
