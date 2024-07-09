import request from "@/utils/request";

export const getDataApi = (params: any) =>
  request({ url: "/api/getData", method: "get", params: params });

export const loginApi = (params: any) =>
  request({ url: "/api/login", method: "post", data: params });
