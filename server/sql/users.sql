CREATE DATABASE IF NOT EXISTS test;

USE test;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    account VARCHAR(50) NOT NULL,
    create_time DATETIME NOT NULL,
    is_delete TINYINT(1) NOT NULL DEFAULT 0,
    password VARCHAR(255) NOT NULL,
    update_time DATETIME NOT NULL,
    description TEXT,
    user_name VARCHAR(50),
    nick_name VARCHAR(50),
    role_ids JSON,
    avatar VARCHAR(255),
    uuid VARCHAR(36) NOT NULL,
    token VARCHAR(255),
    roles JSON
);

-- Optional: users sql表 结构
INSERT INTO users (account, create_time, is_delete, password, update_time, description, user_name, nick_name, role_ids, avatar, uuid, token,roles)
VALUES (
    'testuser',
    NOW(),
    0,
    'test_password',
    NOW(),
    'test_description',
    'admin',
    '管理员',
    JSON_ARRAY(101, 102, 301),
    'https://img1.baidu.com/it/u=1248484120,3563242407&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800',
    UUID(),
    '',
    JSON_ARRAY('admin')
);

