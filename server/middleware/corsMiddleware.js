
// 跨域cors中间件
const cors = require('cors');

const corsMiddleware = cors(); // 直接返回中间件函数

module.exports = corsMiddleware;
