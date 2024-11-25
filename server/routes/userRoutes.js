// 路由模块
const express = require("express");
const userController = require("../controllers/users");
const deleteUsers = require("../controllers/deleteUsers");
const login = require("../controllers/login");
const refreshToken = require("../controllers/refreshToken");
const userInfo = require("../controllers/userInfo");
const register = require("../controllers/register");
const router = express.Router();

// 添加用户
router.post("/", userController.createUser);

// 获取用户列表
router.get("/", userController.getUsers);

// 更新用户
router.put("/:id", userController.updateUser);

// 删除用户（软删除）
router.delete("/:id", userController.deleteUser);

// 获取删除的用户列表
router.get("/deleteList", deleteUsers.getDeletedUsers);

// 完全删除用户接口
router.delete("/deleteList/:id", deleteUsers.permanentDeleteUser);

// 还原删除用户接口
router.put("/restore/:id", deleteUsers.restoreUserApi);

// 登录接口
router.post("/login", login.loginUser);

// 注册接口
router.post("/register", register.registerUser);

// 刷新jwt
router.post("/refresh-token", refreshToken.refreshToken);

// 获取用户信息
router.get("/userInfo", userInfo.getUserDetails);

module.exports = router;
