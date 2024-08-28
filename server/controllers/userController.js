// 控制器模块
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { connection } = require('../config/db.js');

const saltRounds = 10;

// 加密现有用户的密码（如果密码没有加密）
const hashExistingPasswords = () => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return;
        }
        results.forEach(user => {
            if (user.password && !user.password.startsWith('$2b$')) { // 假设bcrypt的密码前缀为$2b$
                bcrypt.hash(user.password, saltRounds, (err, hash) => {
                    if (err) {
                        console.error('Error hashing password for user:', user.userName);
                        return;
                    }
                    const updateUserQuery = 'UPDATE users SET password = ? WHERE id = ?';
                    connection.query(updateUserQuery, [hash, user.id], (err) => {
                        if (err) {
                            console.error('Error updating password for user:', user.userName);
                        } else {
                            console.log('Password updated for user:', user.userName);
                        }
                    });
                });
            }
        });
    });
};

// 添加用户接口
const createUser = (req, res) => {
    const { userName, password, description } = req.body;
    // 增加8小时以适应中国时区
    const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
    const update_time = moment().format('YYYY-MM-DD HH:mm:ss');
    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    // 先对密码进行加密
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            res.status(500).json({ status: 500, message: '密码加密失败', error: err });
            return;
        }
        const query = `INSERT INTO users 
            (account, create_time, is_delete, password, update_time, description, token, userName, nick_name, role_ids, avatar) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            account, create_time, is_delete, hashedPassword, update_time,
            description, token, userName, nick_name,
            JSON.stringify(role_ids), avatar
        ];
        connection.query(query, values, (err, results) => {
            if (err) {
                res.status(500).json({ status: 500, message: '创建失败', error: err });
                return;
            }
            res.status(200).json({ status: 200, message: '创建成功', data: results });
        });
    });
};

// 获取用户列表接口
const getUsers = (req, res) => {
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
};

// 更新用户接口
const updateUser = (req, res) => {
    const { id } = req.params;
    const { userName, password, description } = req.body;
    const update_time = moment().format('YYYY-MM-DD HH:mm:ss');
    // 待处理数据权限菜单转化
    const account = "testuser";
    const is_delete = 0;
    const token = "mock_token_eyJhbGciOiJIUzUxMiJ9";
    const nick_name = "管理员";
    const role_ids = [101, 102, 301];
    const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
    const query = `UPDATE users SET 
        account = ?, is_delete = ?, password = ?, update_time = ?, description = ?, token = ?, userName = ?, 
        nick_name = ?, role_ids = ?, avatar = ? 
        WHERE id = ?`;
    const values = [
        account, is_delete, password, update_time, description, token, userName,
        nick_name, JSON.stringify(role_ids), avatar, id
    ];
    connection.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ status: 500, message: '更新失败', error: err });
            return;
        }
        res.status(200).json({ status: 200, message: '更新成功', data: results });
    });
};

// 删除用户（软删除）接口
const deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE users SET is_delete = 1 WHERE id = ?';
    connection.query(query, [id], (err, results) => {
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
};

// 获取删除的用户列表接口
const getDeletedUsers = (req, res) => {
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
};

// 完全删除用户接口
const permanentDeleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM users WHERE id = ?';
    connection.query(query, [id], (err, results) => {
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
};

// 还原删除用户接口
const restoreUser = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE users SET is_delete = 0 WHERE id = ?';
    connection.query(query, [id], (err, results) => {
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
};

// 用户登录接口
const loginUser = (req, res) => {
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

        // 验证密码 检查密码是否匹配
        const passWordMatch = await bcrypt.compare(password, hashFromDb);

        if (!passWordMatch) {
            return res.status(401).json({ message: '密码错误' });
        }

        // 生成 JWT
        const token = jwt.sign({ userId: user.id, userName: user.userName }, 'jwt_secret', { expiresIn: '1h' });

        // 登录时间
        const login_time = moment().format('YYYY-MM-DD HH:mm:ss');

        // 返回用户信息
        const userInfo = {
            userName: user.userName,
            account: user.account,
            avatar: user.avatar,
            description: user.description,
            create_time: user.create_time,
            update_time: user.update_time,
            is_delete: user.is_delete,
            token: token,  // 如果需要保存更新后的 token
            nick_name: user.nick_name,
            role_ids: user.role_ids,
            login_time: login_time
        };

        res.status(200).json({ message: '登录成功', status: 200, token, userInfo });
    });
};

// 刷新jwt接口
const refreshToken = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: '刷新令牌是必需的' });
    }
    jwt.verify(refreshToken, 'refresh_token_secret', (err, user) => {
        if (err) {
            return res.status(403).json({ message: '无效的刷新令牌' });
        }
        // 生成新的 JWT
        const newToken = jwt.sign({ userId: user.userId, userName: user.userName }, 'jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ token: newToken });
    });
};

// 注册用户接口
const registerUser = (req, res) => {
    const { userName, password, confirmPassword, description } = req.body;
    // 检查必填字段
    if (!userName || !password || !confirmPassword) {
        return res.status(400).json({ status: 400, message: '用户名、密码和确认密码为必填项' });
    }
    // 检查密码是否一致
    if (password !== confirmPassword) {
        return res.status(400).json({ status: 400, message: '密码和确认密码不一致' });
    }
    // 检查用户是否已存在
    const checkUserQuery = 'SELECT * FROM users WHERE userName = ?';
    connection.query(checkUserQuery, [userName], (err, results) => {
        if (err) {
            return res.status(500).json({ status: 500, message: '数据库查询失败', error: err });
        }
        if (results.length > 0) {
            // 用户名已存在
            return res.status(409).json({ status: 409, message: '该用户名已被注册，请选择其他用户名' });
        }
        // 增加8小时以适应中国时区
        const create_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const update_time = moment().format('YYYY-MM-DD HH:mm:ss');
        const account = userName;  // 用户名作为账号
        const is_delete = 0;
        const nick_name = "新用户";  // 默认昵称
        const role_ids = [201];  // 普通用户角色ID
        const avatar = "https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800";
        // 密码加密
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ status: 500, message: '密码加密失败', error: err });
            }
            // 插入用户数据
            const insertUserQuery = `INSERT INTO users 
                (account, create_time, is_delete, password, update_time, description, userName, nick_name, role_ids, avatar) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                account, create_time, is_delete, hashedPassword, update_time,
                description || '', userName, nick_name,
                JSON.stringify(role_ids), avatar
            ];
            connection.query(insertUserQuery, values, (err, results) => {
                if (err) {
                    return res.status(500).json({ status: 500, message: '注册失败', error: err });
                }
                res.status(200).json({ status: 200, message: '注册成功', data: results });
            });
        });
    });
};

module.exports = {
    hashExistingPasswords,
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getDeletedUsers,
    permanentDeleteUser,
    restoreUser,
    loginUser,
    refreshToken,
    registerUser
};
