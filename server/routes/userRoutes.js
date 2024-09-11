// 路由模块
const express = require("express");
const userController = require("../controllers/userController");
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
router.get("/deleteList", userController.getDeletedUsers);

// 完全删除用户接口
router.delete("/deleteList/:id", userController.permanentDeleteUser);

// 还原删除用户接口
router.put("/restore/:id", userController.restoreUserApi);

// 登录接口
router.post("/login", userController.loginUser);

// 注册接口
router.post("/register", userController.registerUser);

// 刷新jwt
router.post("/refresh-token", userController.refreshToken);

module.exports = router;
