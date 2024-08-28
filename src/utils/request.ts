import axios from "axios";
import { ElNotification } from "element-plus";

let request = axios.create({
  baseURL: import.meta.env.VITE_MODE, // 基础路径上会携带/api
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use((config: any) => {
  // 从 localStorage 中获取 token
  const token = localStorage.getItem('token');

  // 如果 token 存在，将其添加到请求头中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应成功，返回数据
    return response.data;
  },
  (error) => {
    let errorInfo = "";
    const status = error.response ? error.response.status : 0;

    // 如果后端返回了具体的错误信息
    if (error.response && error.response.data && error.response.data.message) {
      errorInfo = error.response.data.message;
    } else {
      // 默认错误信息处理
      switch (status) {
        case 401:
          errorInfo = "未授权，请登录";
          break;
        case 403:
          errorInfo = "拒绝访问";
          break;
        case 404:
          errorInfo = "请求地址出错";
          break;
        case 408:
          errorInfo = "请求超时";
          break;
        case 500:
          errorInfo = "服务器内部错误";
          break;
        case 501:
          errorInfo = "服务未实现";
          break;
        case 502:
          errorInfo = "网关错误";
          break;
        case 503:
          errorInfo = "服务不可用";
          break;
        case 504:
          errorInfo = "网关超时";
          break;
        default:
          errorInfo = "网络出现问题!";
          break;
      }
    }

    // 提示错误信息
    ElNotification({
      message: errorInfo,
      type: "error",
      duration: 1 * 1000,
    });

    // 将错误信息返回给前端页面，方便捕获具体的message
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default request;
