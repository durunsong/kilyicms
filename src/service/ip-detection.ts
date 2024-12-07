import request from "@/utils/request";

// 获取代理检测结果===第三方服务--proxycheck.io
export const getProxycheck = (ip: string) => {
  return request({
    url: "/proxycheck",
    method: "GET",
    params: { ip },
  });
};
