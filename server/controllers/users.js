const {
  hashPassword,
  generateUUID,
  formatTime,
  verifyToken,
} = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");

// 添加用户接口
const createUser = async (req, res) => {
  try {
    const { user_name, password, description, roles } = req.body;
    const create_time = formatTime();
    const update_time = formatTime();
    const account = "testuser";
    const is_delete = 0;
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar =
      "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    const uuid = generateUUID();
    // 查重
    const checkQuery = "SELECT * FROM users WHERE user_name = ?";
    connection.query(checkQuery, [user_name], async (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 500, message: "查询失败", error: err });
      }
      if (results.length > 0) {
        return res
          .status(400)
          .json({ status: 400, message: "用户名已存在，请换个名字试试" });
      }
      // 密码加密
      const hashedPassword = await hashPassword(password);
      const query = `INSERT INTO users 
                (uuid, account, create_time, is_delete, password, update_time, description, user_name, nick_name, role_ids, avatar, roles) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        uuid,
        account,
        create_time,
        is_delete,
        hashedPassword,
        update_time,
        description,
        user_name,
        nick_name,
        JSON.stringify(role_ids),
        avatar,
        JSON.stringify(roles),
      ];
      connection.query(query, values, (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ status: 500, message: "创建失败", error: err });
        }
        res
          .status(200)
          .json({ status: 200, message: "创建成功", data: results });
      });
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "服务器错误", error });
  }
};

// 获取用户列表接口
const getUsers = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: 401, message: "登录过期，请重新登录" });
    }
    const token = authHeader.split(" ")[1];
    await verifyToken(token, "jwt_secret");
    const { pageNum, pageSize, keywords, startTime, endTime } = req.query;
    const offset = (pageNum - 1) * pageSize;
    let query = "SELECT * FROM users WHERE is_delete = 0";
    let countQuery = "SELECT COUNT(*) AS total FROM users WHERE is_delete = 0";
    const queryParams = [];
    if (keywords) {
      query += " AND (user_name LIKE ? OR description LIKE ?)";
      countQuery += " AND (user_name LIKE ? OR description LIKE ?)";
      const keywordPattern = `%${keywords}%`;
      queryParams.push(keywordPattern, keywordPattern);
    }
    if (startTime && endTime) {
      query += " AND create_time BETWEEN ? AND ?";
      countQuery += " AND create_time BETWEEN ? AND ?";
      queryParams.push(startTime, endTime);
    }
    query += " LIMIT ?, ?";
    queryParams.push(parseInt(offset), parseInt(pageSize));
    connection.query(query, queryParams, (err, results) => {
      if (err) {
        return res.status(500).json({ status: 500, message: "查询用户失败" });
      }
      const formattedResults = results.map((user) => {
        user.update_time = formatTime(user.update_time);
        user.create_time = formatTime(user.create_time);
        return user;
      });
      connection.query(
        countQuery,
        queryParams.slice(0, queryParams.length - 2),
        (countErr, countResults) => {
          if (countErr) {
            return res
              .status(500)
              .json({ status: 500, message: "查询用户总数失败" });
          }
          const total = countResults[0].total;
          res.status(200).json({
            status: 200,
            message: "查询成功",
            page: parseInt(pageNum),
            pageSize: parseInt(pageSize),
            total,
            data: formattedResults,
          });
        },
      );
    });
  } catch (error) {
    res
      .status(401)
      .json({ status: 401, message: "登录过期，请重新登录", error });
  }
};

// 更新用户接口
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_name, password, description, roles } = req.body;
    const update_time = formatTime();
    // 默认数据
    const account = "testuser";
    const is_delete = 0;
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar =
      "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    // 加密密码
    const hashedPassword = await hashPassword(password);
    const query = `UPDATE users SET 
          account = ?, is_delete = ?, password = ?, update_time = ?, description = ?, user_name = ?, 
          nick_name = ?, role_ids = ?, avatar = ?, roles = ?
          WHERE id = ?`;
    const values = [
      account,
      is_delete,
      hashedPassword,
      update_time,
      description,
      user_name,
      nick_name,
      JSON.stringify(role_ids),
      avatar,
      JSON.stringify(roles),
      id,
    ];
    connection.query(query, values, (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 500, message: "更新失败", error: err });
      }
      if (results.affectedRows === 0) {
        return res.status(409).json({ status: 409, message: "用户不存在" });
      }
      res.status(200).json({ status: 200, message: "更新成功", data: results });
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "服务器错误", error });
  }
};

// 删除用户（软删除）接口
const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE users SET is_delete = 1 WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ status: 500, message: "删除用户失败", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(409).json({ status: 409, message: "用户不存在" });
    }
    res.status(200).json({ status: 200, message: "用户删除成功" });
  });
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
