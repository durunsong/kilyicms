import request from "@/utils/request";

export const loginApi = (params: any) =>
  request({ url: "api/users/login", method: "post", data: params });
