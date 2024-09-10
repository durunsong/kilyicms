import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosHeaders } from "axios";
import { ElNotification, ElLoading } from "element-plus";
import { useRouter } from "vue-router";

let loadingInstance: any = null;
const pendingRequests: any = {};

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // 基础路径上会携带/api
  timeout: 5000
});

// 展示 loading
const showLoading = () => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "Loading...",
    background: "rgba(0, 0, 0, 0.5)",
    spinner: `
        <svg width="50" height="50" viewBox="0 0 135 135" xmlns="http://www.w3.org/2000/svg" fill="#409eff">
            <path d="M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 67 67"
                    to="-360 67 67"
                    dur="2.5s"
                    repeatCount="indefinite"/>
            </path>
            <path d="M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z">
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 67 67"
                    to="360 67 67"
                    dur="8s"
                    repeatCount="indefinite"/>
            </path>
        </svg>
    `
  });
};

// 关闭 loading
const hideLoading = () => {
  if (loadingInstance) {
    loadingInstance.close();
  }
};

// 生成请求 key
const generateRequestKey = (config: InternalAxiosRequestConfig) => {
  const { method, url, params, data } = config;
  return `${method}:${url}:${JSON.stringify(params)}:${JSON.stringify(data)}`;
};

// 添加请求到 pending 中
const addPendingRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = generateRequestKey(config);
  if (pendingRequests[requestKey]) {
    config.cancelToken = new axios.CancelToken((cancel) => {
      cancel("取消重复请求");
    });
  } else {
    pendingRequests[requestKey] = true;
  }
};

// 移除 pending 中的请求
const removePendingRequest = (config: InternalAxiosRequestConfig) => {
  const requestKey = generateRequestKey(config);
  delete pendingRequests[requestKey];
};

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 显示 loading 动画
    showLoading();

    // 添加重复请求处理
    addPendingRequest(config);

    // 确保 headers 存在
    if (!config.headers) {
      config.headers = new AxiosHeaders(); // 使用 AxiosHeaders 创建 headers
    }

    // 禁用缓存
    config.headers.set("Cache-Control", "no-cache");
    config.headers.set("Pragma", "no-cache");
    config.headers.set("Expires", "0");

    // 从 localStorage 中获取 token
    const token = localStorage.getItem("token");

    // 如果 token 存在，将其添加到请求头中
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`); // 使用 set 方法
    }

    // 文件上传设置
    if (config.headers.get("Content-Type") === "multipart/form-data") {
      config.headers.set("Content-Type", "multipart/form-data");
    } else {
      config.headers.set("Content-Type", "application/json");
    }

    return config;
  },
  (error: any) => {
    hideLoading();
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 关闭 loading 动画
    hideLoading();

    // 移除 pending 请求
    removePendingRequest(response.config);

    // 响应成功，返回数据
    return response.data;
  },
  async (error: any) => {
    hideLoading();

    let errorInfo = "";
    const status = error.response ? error.response.status : 0;
    const originalRequest = error.config;

    // 处理 HTTP 错误状态码
    switch (status) {
      case 401: {
        errorInfo = "未授权，请登录";
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && !originalRequest._retry) {
          originalRequest._retry = true;
          // 实现刷新 token 的逻辑
          // const newToken = await refreshAccessToken(refreshToken);
          // localStorage.setItem("token", newToken);
          // originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          // return request(originalRequest); // 重新发起请求
        } else {
          const router = useRouter();
          router.push("/login");
        }
        break;
      }
      case 403: {
        errorInfo = "拒绝访问";
        break;
      }
      case 404: {
        errorInfo = "请求地址出错";
        break;
      }
      case 408: {
        errorInfo = "请求超时";
        break;
      }
      case 500: {
        errorInfo = "服务器内部错误";
        break;
      }
      case 501: {
        errorInfo = "服务未实现";
        break;
      }
      case 502: {
        errorInfo = "网关错误";
        break;
      }
      case 503: {
        errorInfo = "服务不可用";
        break;
      }
      case 504: {
        errorInfo = "网关超时";
        break;
      }
      default: {
        errorInfo = "网络出现问题!";
        break;
      }
    }

    // 提示错误信息
    ElNotification({
      message: errorInfo,
      type: "error",
      duration: 1 * 1000
    });

    // 将错误信息返回给前端页面，方便捕获具体的 message
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default request;

/**
 * 1.Loading 动画：在请求发起时显示加载动画，结束时关闭。
 * 2.防止重复请求：利用 CancelToken 防止短时间内重复请求。
 * 3.自动刷新 Token：当返回 401 错误时，尝试刷新 Token 并重新发起请求。
 * 4.文件上传支持：根据 Content-Type 自动设置请求头。
 * **/
