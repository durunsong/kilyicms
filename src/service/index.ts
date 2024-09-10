import request from "@/utils/request";

export const loginApi = (params: any) => request({ url: "api/users/login", method: "post", data: params });

// register
export const registerApi = (params: any) => request({ url: "api/users/register", method: "post", data: params });
