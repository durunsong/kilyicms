// 路由模块
const express = require("express");
const userController = require("../controllers/users");
const deleteUsers = require("../controllers/deleteUsers");
const login = require("../controllers/login");
const refreshToken = require("../controllers/refreshToken");
const userInfo = require("../controllers/userInfo");
const register = require("../controllers/register");
const homePage = require("../controllers/home");
const router = express.Router();

//  首页
router.get("/", homePage.homePage);

// 添加用户
router.post("/api/users", userController.createUser);

// 获取用户列表
router.get("/api/users", userController.getUsers);

// 更新用户
router.put("/api/users/:id", userController.updateUser);

// 删除用户（软删除）
router.delete("/api/users/:id", userController.deleteUser);

// 获取删除的用户列表
router.get("/api/users/deleteList", deleteUsers.getDeletedUsers);

// 完全删除用户接口
router.delete("/api/users/deleteList/:id", deleteUsers.permanentDeleteUser);

// 还原删除用户接口
router.put("/api/users/restore/:id", deleteUsers.restoreUserApi);

// 登录接口
router.post("/api/users/login", login.loginUser);

// 注册接口
router.post("/api/users/register", register.registerUser);

// 刷新jwt
router.post("/api/users/refresh-token", refreshToken.refreshToken);

// 获取用户信息
router.get("/api/users/userInfo", userInfo.getUserDetails);

module.exports = router;
