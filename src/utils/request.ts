// axios二次封装
import axios from "axios";
// import { request } from "http";

import { ElMessage } from "element-plus";

// 利用axios对象的create方法,去创建axios实例(配置路径/超时....)

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000,
});
// console.log("title++++++++",import.meta.env) // NODE_ENV
// 2. request 实例添加请求与响应拦截器
request.interceptors.request.use((config: any) => {
  //  config配置对象,headers 属性请求头,经常给服务器携带公共参数
  // 返回配置对象
  console.log("dgfyfb", config);

  return config;
});

// 3.响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log("拦截", response);

    // 响应成功(成功回调)
    return response.data;
  },
  (error) => {
    // 响应失败(失败回调):处理http网络错误
    // return Promise.reject(error);
    // 定义一个变量:存储网络错误信息
    let errorInfo = "";
    let status = error.response.status;
    switch (status) {
      case 400:
        errorInfo = "请求错误";
        break;
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
