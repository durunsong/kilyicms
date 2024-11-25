// 控制器模块
const { connection } = require("../config/db-connection.js");

// 获取删除的用户列表接口
const getDeletedUsers = (req, res) => {
  const { pageNum, pageSize, keywords, startTime, endTime } = req.query;
  const offset = (pageNum - 1) * pageSize;
  let query = "SELECT * FROM users WHERE is_delete = 1";
  let countQuery = "SELECT COUNT(*) AS total FROM users WHERE is_delete = 1";
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
      console.error(err);
      res.status(500).json({ status: 500, message: "查询用户失败" });
      return;
    }
    // 时间格式转化
    const formattedResults = results.map((user) => {
      user.update_time = user.update_time
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      user.create_time = user.create_time
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      return user;
    });
    connection.query(
      countQuery,
      queryParams.slice(0, queryParams.length - 2),
      (countErr, countResults) => {
        if (countErr) {
          console.error(countErr);
          res.status(500).json({ status: 500, message: "查询用户总数失败" });
          return;
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
};

// 完全删除用户接口
const permanentDeleteUser = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "删除用户失败" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ status: 404, message: "用户不存在" });
    } else {
      res.status(200).json({ status: 200, message: "用户删除成功" });
    }
  });
};

// 还原删除用户接口
const restoreUserApi = (req, res) => {
  const { id } = req.params;
  const query = "UPDATE users SET is_delete = 0 WHERE id = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: 500, message: "还原用户失败" });
      return;
    }
    if (results.affectedRows === 0) {
      res
        .status(404)
        .json({ status: 404, message: "用户不存在或已被永久删除" });
    } else {
      res.status(200).json({ status: 200, message: "用户还原成功" });
    }
  });
};

module.exports = {
  getDeletedUsers,
  permanentDeleteUser,
  restoreUserApi,
};
