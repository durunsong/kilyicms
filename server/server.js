const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

//这个组件用于接收post数据
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const jwt = require("jsonwebtoken")

// 创建服务器对象
const app = express();
const port = 4000;

// 中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

//解决跨域
app.all("*", function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	res.header("Access-Control-Allow-Methods", "*")
	res.header("Content-Type", "application/json;charset=utf-8")
	next()
})

// MySQL 链接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    multipleStatements: true,
});

connection.connect(err => {
    if (err) {
        console.error('数据库连接失败: ', err);
    } else {
        console.log('已连接到数据库');
    }
});

// 添加用户
app.post('/api/users', (req, res) => {
    const { userName, password, description } = req.body;

    // 增加8小时以适应中国时区
    const create_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
    const update_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const logo = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg";
    const avatar = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg";

    const query = `INSERT INTO users 
        (account, create_time, is_delete, password, update_time, description, token, userName, nick_name, role_ids, logo, avatar) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        account, create_time, is_delete, password, update_time, 
        description, token, userName, nick_name, 
        JSON.stringify(role_ids), logo, avatar
    ];

    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ status: 500, message: '创建失败', error: err });
            return;
        }
        res.status(200).json({ status: 200, message: '创建成功', data: results });
    });
});


// 获取用户列表
app.get('/api/users', (req, res) => {
    const { pageNum, pageSize, keywords, startTime, endTime } = req.query;
    const offset = (pageNum - 1) * pageSize;
    let query = 'SELECT * FROM users WHERE is_delete = 0';
    let countQuery = 'SELECT COUNT(*) AS total FROM users WHERE is_delete = 0';
    const queryParams = [];

    if (keywords) {
        query += ' AND (userName LIKE ? OR description LIKE ?)';
        countQuery += ' AND (userName LIKE ? OR description LIKE ?)';
        const keywordPattern = `%${keywords}%`;
        queryParams.push(keywordPattern, keywordPattern);
    }

    if (startTime && endTime) {
        query += ' AND create_time BETWEEN ? AND ?';
        countQuery += ' AND create_time BETWEEN ? AND ?';
        queryParams.push(startTime, endTime);
    }

    query += ' LIMIT ?, ?';
    queryParams.push(parseInt(offset), parseInt(pageSize));

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: '查询用户失败' });
            return;
        }
        // 时间格式转化
        const formattedResults = results.map(user => {
            user.update_time = user.update_time.toISOString().slice(0, 19).replace('T', ' ');
            user.create_time = user.create_time.toISOString().slice(0, 19).replace('T', ' ');
            return user;
        });
        connection.query(countQuery, queryParams.slice(0, queryParams.length - 2), (countErr, countResults) => {
            if (countErr) {
                console.error(countErr);
                res.status(500).json({ status: 500, message: '查询用户总数失败' });
                return;
            }
            const total = countResults[0].total;
            res.status(200).json({ status: 200, message: '查询成功', page: parseInt(pageNum), pageSize: parseInt(pageSize), total, data: formattedResults });
        });
    });
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { userName, password, description } = req.body;

    const update_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

    // 待处理数据权限菜单转化
    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const logo = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg";
    const avatar = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg"

    const query = `UPDATE users SET 
        account = ?, is_delete = ?, password = ?, update_time = ?, description = ?, token = ?, userName = ?, 
        nick_name = ?, role_ids = ?, logo = ?, avatar = ? 
        WHERE id = ?`;
    const values = [account, is_delete, password, update_time, description, token, userName, nick_name, JSON.stringify(role_ids), logo, avatar, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ status: 500, message: '更新失败', error: err });
            return;
        }
        res.status(200).json({ status: 200, message: '更新成功', data: results });
    });
});


// 删除用户（软删除）
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'UPDATE users SET is_delete = 1 WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: '删除用户失败' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ status: 404, message: '用户不存在' });
        } else {
            res.status(200).json({ status: 200, message: '用户删除成功' });
        }
    });
});


// 获取删除的用户列表
app.get('/api/users/deleteList', (req, res) => {
    const { pageNum, pageSize, keywords, startTime, endTime } = req.query;
    const offset = (pageNum - 1) * pageSize;
    let query = 'SELECT * FROM users WHERE is_delete = 1';
    let countQuery = 'SELECT COUNT(*) AS total FROM users WHERE is_delete = 1';
    const queryParams = [];

    if (keywords) {
        query += ' AND (userName LIKE ? OR description LIKE ?)';
        countQuery += ' AND (userName LIKE ? OR description LIKE ?)';
        const keywordPattern = `%${keywords}%`;
        queryParams.push(keywordPattern, keywordPattern);
    }

    if (startTime && endTime) {
        query += ' AND create_time BETWEEN ? AND ?';
        countQuery += ' AND create_time BETWEEN ? AND ?';
        queryParams.push(startTime, endTime);
    }

    query += ' LIMIT ?, ?';
    queryParams.push(parseInt(offset), parseInt(pageSize));

    connection.query(query, queryParams, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: '查询用户失败' });
            return;
        }
        // 时间格式转化
        const formattedResults = results.map(user => {
            user.update_time = user.update_time.toISOString().slice(0, 19).replace('T', ' ');
            user.create_time = user.create_time.toISOString().slice(0, 19).replace('T', ' ');
            return user;
        });
        connection.query(countQuery, queryParams.slice(0, queryParams.length - 2), (countErr, countResults) => {
            if (countErr) {
                console.error(countErr);
                res.status(500).json({ status: 500, message: '查询用户总数失败' });
                return;
            }
            const total = countResults[0].total;
            res.status(200).json({ status: 200, message: '查询成功', page: parseInt(pageNum), pageSize: parseInt(pageSize), total, data: formattedResults });
        });
    });
});

// 完全删除用户接口
app.delete('/api/users/deleteList/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: '删除用户失败' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ status: 404, message: '用户不存在' });
        } else {
            res.status(200).json({ status: 200, message: '用户删除成功' });
        }
    });
});

// 还原删除用户接口
app.put('/api/users/restore/:id', (req, res) => {
    const userId = req.params.id;
    const query = 'UPDATE users SET is_delete = 0 WHERE id = ?';
    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ status: 500, message: '还原用户失败' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ status: 404, message: '用户不存在或已被永久删除' });
        } else {
            res.status(200).json({ status: 200, message: '用户还原成功' });
        }
    });
});


// 登录接口
app.post('/api/login', (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: '账号和密码都是必需的' });
    }

    const findUserQuery = 'SELECT * FROM users WHERE userName = ? AND is_delete = 0';
    connection.query(findUserQuery, [userName], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: '查询用户失败' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: '用户不存在' });
        }

        const user = results[0];
        
        const hashFromDb = user.password;
        console.log('Hash from DB:', hashFromDb);
        console.log('Password to compare:', password);
        // 验证密码
        // const passWordMatch = await bcrypt.compare(password, hashFromDb);
        // console.log('Password Match:', passWordMatch);
        // if (!passWordMatch) {
        //     return res.status(401).json({ message: '密码错误' });
        // }

        // 生成 JWT
        const token = jwt.sign({ userId: user.id, userName: user.userName }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: '登录成功', token });
    });
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
