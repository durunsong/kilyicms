import request from "@/utils/request";

// export const loginApi = (params: any) =>
// request({ url: "api/users/login", method: "post", data: params });
export const loginApi = () =>
  request({ url: "/api/users/login", method: "get" }); //先静态接口，后面后端完全部署再改

// register
export const registerApi = (params: any) =>
  request({ url: "api/users/register", method: "post", data: params });
