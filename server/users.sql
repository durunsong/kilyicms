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
    token VARCHAR(255),
    userName VARCHAR(50),
    nick_name VARCHAR(50),
    role_ids JSON,
    logo VARCHAR(255),
    avatar VARCHAR(255)
);

-- Optional: Inserting a sample user for testing
INSERT INTO users (account, create_time, is_delete, password, update_time, description, token, userName, nick_name, role_ids, logo, avatar)
VALUES ('testuser', NOW(), 0, 'test_name', 'test_password', NOW(), 'test_description', 'mock_token_eyJhbGciOiJIUzUxMiJ9', 'admin', '管理员', JSON_ARRAY(101, 102, 301), 'https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg', 'https://c-ssl.dtstatic.com/uploads/blog/202207/09/20220709150824_97667.thumb.1000_0.jpg');
