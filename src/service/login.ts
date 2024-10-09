import request from "@/utils/request";

// 登录请求参数类型
interface LoginRequestData {
  userName: string;
  password: string;
}

// 注册请求参数类型
interface RegisterRequestData {
  userName: string;
  password: string;
  confirmPassword?: string;
}

// 登录响应类型
interface LoginResponse {
  status: number;
  message: string;
  token: string;
  userInfo: {
    userName: string;
    email?: string;
    // 其他用户信息字段
  };
}

// 注册响应类型
interface RegisterResponse {
  status: number;
  message: string;
}

// login
export const loginApi = (params: LoginRequestData) =>
  request<LoginResponse>({
    url: "api/users/login",
    method: "post",
    data: params,
  });

// register
export const registerApi = (params: RegisterRequestData) =>
  request<RegisterResponse>({
    url: "api/users/register",
    method: "post",
    data: params,
  });

// userInfo
export const userInfoApi = () =>
  request({ url: "/api/users/userInfo", method: "GET" });
