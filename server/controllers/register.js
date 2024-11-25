const { hashPassword, formatTime, generateUUID } = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");

const registerUser = (req, res) => {
  const { user_name, password, confirmPassword, description, roles } = req.body;

  // 检查必填字段
  if (!user_name || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ status: 400, message: "用户名、密码和确认密码为必填项" });
  }

  // 检查密码是否一致
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ status: 400, message: "密码和确认密码不一致" });
  }
  // 生成 UUID
  const uuid = generateUUID();
  // 检查用户是否已存在
  const checkUserQuery = "SELECT * FROM users WHERE user_name = ?";
  connection.query(checkUserQuery, [user_name], async (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 500, message: "数据库查询失败", error: err });
    }

    if (results.length > 0) {
      return res
        .status(409)
        .json({ status: 409, message: "该用户名已被注册，请选择其他用户名" });
    }

    // 默认值
    const create_time = formatTime();
    const update_time = formatTime();
    const account = user_name;
    const is_delete = 0;
    const nick_name = "新用户"; // 默认昵称
    const role_ids = [201]; // 普通用户角色ID
    const avatar =
      "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";

    // 密码加密
    try {
      const hashedPassword = await hashPassword(password);

      // 插入用户数据
      const insertUserQuery = `
        INSERT INTO users 
        (uuid, account, create_time, is_delete, password, update_time, description, user_name, nick_name, role_ids, avatar, roles) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        uuid,
        account,
        create_time,
        is_delete,
        hashedPassword,
        update_time,
        description || "",
        user_name,
        nick_name,
        JSON.stringify(role_ids),
        avatar,
        JSON.stringify(roles || []),
      ];

      connection.query(insertUserQuery, values, (err, results) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ status: 500, message: "注册失败", error: err });
        }
        res
          .status(200)
          .json({ status: 200, message: "注册成功", data: results });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: 500, message: "注册过程中发生错误", error });
    }
  });
};

module.exports = {
  registerUser,
};
