// 入口文件
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const bodyParserMiddleware = require("../middleware/bodyParserMiddleware");
const corsMiddleware = require("../middleware/corsMiddleware");
const userRoutes = require("../routes/userRoutes");
const { connectDb } = require("../config/db-connection");
const path = require("path");
// const { hashExistingPasswords } = require("./controllers/hashExistingPasswords");

// 创建服务器对象
const app = express();

// 在服务器启动时，调用 hashExistingPasswords 函数
// 备用方案， 如果需要加密所有用户密码，则取消注释
// hashExistingPasswords();

//  加载中间件
app.use(bodyParserMiddleware.json); // 使用 bodyParser.json()
app.use(bodyParserMiddleware.urlencoded); // 使用 bodyParser.urlencoded()
app.use(corsMiddleware); // 使用 cors()

// 设置静态资源目录
app.use(express.static(path.join(__dirname, "../public")));

// 设置视图引擎
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

// 数据库连接
connectDb();

// 注册路由
app.use("/", userRoutes);

// 处理 404 错误
app.use((req, res, next) => {
  next(createError(404));
});

// 错误处理
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500).render("error");
});

module.exports = app;
