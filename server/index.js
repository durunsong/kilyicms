// 入口文件
const express = require("express");
const bodyParserMiddleware = require("./middleware/bodyParserMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const userRoutes = require("./routes/userRoutes");
const { connectDb } = require("./config/db-connection");
// const { hashExistingPasswords } = require("./controllers/hashExistingPasswords");

// 创建服务器对象
const app = express();
const PORT = process.env.PORT || 4000;

// 在服务器启动时，调用 hashExistingPasswords 函数
// 备用方案， 如果需要加密所有用户密码，则取消注释
// hashExistingPasswords();

// 中间件
app.use(bodyParserMiddleware.json); // 使用 bodyParser.json()
app.use(bodyParserMiddleware.urlencoded); // 使用 bodyParser.urlencoded()
app.use(corsMiddleware); // 使用 cors()

// 数据库连接
connectDb();

// 注册路由
app.use("/api/users", userRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
