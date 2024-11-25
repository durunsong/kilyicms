// 加密现有用户的密码（如果密码没有加密）
const { hashPassword } = require("../utils/utils.js");
const { connection } = require("../config/db-connection.js");

// 加密现有用户的密码（如果密码没有加密）
const hashExistingPasswords = () => {
  connection.query("SELECT * FROM users", async (err, results) => {
    if (err) {
      console.error("Error fetching users:", err);
      return;
    }
    for (const user of results) {
      if (user.password && !user.password.startsWith("$2b$")) {
        try {
          // 使用 utils.js 中的 hashPassword 方法
          const hashedPassword = await hashPassword(user.password);
          const updateUserQuery = "UPDATE users SET password = ? WHERE id = ?";

          connection.query(
            updateUserQuery,
            [hashedPassword, user.id],
            (err) => {
              if (err) {
                console.error(
                  "Error updating password for user:",
                  user.user_name,
                );
              } else {
                console.log("Password updated for user:", user.user_name);
              }
            },
          );
        } catch (error) {
          console.error(
            `Error hashing password for user ${user.user_name}:`,
            error.message,
          );
        }
      }
    }
  });
};

module.exports = {
  hashExistingPasswords,
};
