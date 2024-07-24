const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');


const app = express();
const port = 4000;

// 中间件
app.use(bodyParser.json());
app.use(cors());

// MySQL 链接
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
});

connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// 添加用户
app.post('/api/users', (req, res) => {
    const { name, password, description } = req.body;

    // 增加8小时以适应中国时区
    const create_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
    const update_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

    // 待处理数据权限菜单转化
    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const login_name = "admin";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const logo = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg";
    const avatar = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg"

    const query = `INSERT INTO users 
        (account, create_time, is_delete, name, password, update_time, description, token, login_name, nick_name, role_ids, logo, avatar) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [account, create_time, is_delete, name, password, update_time, description, token, login_name, nick_name, JSON.stringify(role_ids), logo, avatar];

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
        query += ' AND (name LIKE ? OR description LIKE ?)';
        countQuery += ' AND (name LIKE ? OR description LIKE ?)';
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
    const { name, password, description } = req.body;

    const update_time = moment().add(8, 'hours').format('YYYY-MM-DD HH:mm:ss');

    // 待处理数据权限菜单转化
    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const login_name = "admin";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const logo = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg";
    const avatar = "https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg"

    const query = `UPDATE users SET 
        account = ?, is_delete = ?, name = ?, password = ?, update_time = ?, description = ?, token = ?, login_name = ?, 
        nick_name = ?, role_ids = ?, logo = ?, avatar = ? 
        WHERE id = ?`;
    const values = [account, is_delete, name, password, update_time, description, token, login_name, nick_name, JSON.stringify(role_ids), logo, avatar, id];

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
