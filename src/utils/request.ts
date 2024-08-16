import axios from "axios";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();


let request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 基础路径上会携带/api
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
  async (error) => {
    let errorInfo = "";
    const status = error.response.status;

    switch (status) {
      case 401:
        errorInfo = "未授权，请登录";

        // 检查是否有刷新令牌
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            // 请求新的访问令牌
            const { data } = await axios.post('/api/refresh-token', { refreshToken });
            
            // 保存新的访问令牌
            localStorage.setItem('token', data.token);
            
            // 更新请求头并重新发送原来的请求
            error.config.headers['Authorization'] = `Bearer ${data.token}`;
            return request(error.config);
          } catch (refreshError) {
            console.error('刷新令牌失败：', refreshError);
            // 重定向到登录页
            router.push("/login");
          }
        } else {
          // 没有刷新令牌，重定向到登录页
          router.push("/login");
        }
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
        errorInfo = "网络出现问题!!!!";
        break;
    }

    // 提示错误信息
    ElMessage({
      message: errorInfo,
      type: "error",
      duration: 1 * 1000,
    });

    return Promise.reject(error);
  }
);

export default request;
