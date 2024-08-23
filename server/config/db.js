// 配置模块
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    multipleStatements: true,
});

const connectDb = () => {
    connection.connect(err => {
        if (err) {
            console.error('数据库连接失败: ', err);
        } else {
            console.log('已连接到数据库');
        }
    });
};

module.exports = { connection, connectDb };
