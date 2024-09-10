import request from "@/utils/request";
import type { AxiosResponse } from "axios";

interface ListItem {
  id: number;
  userName: string;
  description: string;
}

interface ListResponse {
  status: number;
  message: string;
  data: ListItem[];
  total: number;
}

interface ItemResponse {
  status: number;
  message: string;
  data: ListItem;
}

// 查询列表
export const getItemApi = (params: {
  pageNum: number;
  pageSize: number;
  keywords: string | null;
  startTime?: string | null;
  endTime?: string | null;
}): Promise<AxiosResponse<ListResponse>> => request({ url: "/api/users", method: "GET", params: params });

// 添加用户
export const addItemApi = (params: Omit<ListItem, "id">): Promise<AxiosResponse<ItemResponse>> =>
  request({ url: "/api/users", method: "POST", data: params });

// 更新用户
export const updateItemApi = (id: number, params: Omit<ListItem, "id">): Promise<AxiosResponse<ItemResponse>> =>
  request({ url: `/api/users/${id}`, method: "PUT", data: params });

// 删除用户
export const deleteItemApi = (id: number): Promise<AxiosResponse<ListResponse>> =>
  request({ url: `/api/users/${id}`, method: "DELETE" });

// 获取删除列表
export const getDeleteUserItemApi = (params: {
  pageNum: number;
  pageSize: number;
  keywords: string | null;
  startTime?: string | null;
  endTime?: string | null;
}): Promise<AxiosResponse<ListResponse>> => request({ url: "/api/users/deleteList", method: "GET", params: params });

// 彻底删除用户
export const deleteItemSiftApi = (id: number): Promise<AxiosResponse<ListResponse>> =>
  request({ url: `/api/users/deleteList/${id}`, method: "DELETE" });

// 恢复删除用户
export const restoreUserApi = (id: number): Promise<AxiosResponse<ListResponse>> =>
  request({ url: `/api/users/restore/${id}`, method: "PUT" });
