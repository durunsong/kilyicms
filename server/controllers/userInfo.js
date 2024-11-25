const { connection } = require("../config/db-connection.js");
const { verifyToken } = require("../utils/utils.js");

// 获取用户详情接口
const getUserDetails = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // 从请求头获取 token
  if (!token) {
    return res.status(401).json({ message: "用户未登录" });
  }

  try {
    // 验证并解码 JWT
    const decoded = verifyToken(token);
    const userId = decoded.id; // 获取解码后的用户 ID

    // 使用 ID 查询用户详情
    const findUserQuery = "SELECT * FROM users WHERE id = ? AND is_delete = 0";
    connection.query(findUserQuery, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "查询用户失败" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "用户不存在" });
      }

      const user = results[0];
      const userInfo = {
        id: user.id,
        user_name: user.user_name,
        account: user.account,
        avatar: user.avatar,
        description: user.description,
        create_time: user.create_time,
        update_time: user.update_time,
        is_delete: user.is_delete,
        nick_name: user.nick_name,
        role_ids: user.role_ids,
        roles: user.roles,
      };

      res
        .status(200)
        .json({ message: "获取用户信息成功", status: 200, userInfo });
    });
  } catch (error) {
    console.error("JWT 验证失败:", error.message);
    return res.status(403).json({ message: "登录过期，请重新登录" });
  }
};

module.exports = {
  getUserDetails,
};
