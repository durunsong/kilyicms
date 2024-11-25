const {
  comparePassword,
  formatTime,
  generateToken,
} = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");

const loginUser = (req, res) => {
  const { user_name, password } = req.body;

  if (!user_name || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "账号和密码都是必需的" });
  }

  const findUserQuery =
    "SELECT * FROM users WHERE user_name = ? AND is_delete = 0";

  connection.query(findUserQuery, [user_name], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: 500, message: "查询用户失败" });
    }

    if (results.length === 0) {
      return res.status(409).json({ status: 409, message: "用户不存在" });
    }

    const user = results[0];
    const hashFromDb = user.password;

    // 验证密码
    const passWordMatch = await comparePassword(password, hashFromDb);
    if (!passWordMatch) {
      return res.status(409).json({ status: 409, message: "用户名或密码错误" });
    }

    // 生成 JWT
    const token = generateToken({ id: user.id, user_name: user.user_name });

    // 登录时间
    const login_time = formatTime();
    res.status(200).json({
      message: "登录成功",
      status: 200,
      token,
      login_time,
    });
  });
};

module.exports = {
  loginUser,
};
