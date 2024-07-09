import request from "@/utils/request";
import type { AxiosResponse } from "axios";

interface ListItem {
  id: number;
  name: string;
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
export const getListApi = (params: { page: number, pageSize: number, keyword: string }): Promise<AxiosResponse<ListResponse>> =>
  request({ url: "/api/list", method: "GET" , params:params});

// 添加项目
export const addItemApi = (params: Omit<ListItem, 'id'>): Promise<AxiosResponse<ItemResponse>> =>
  request({ url: "/api/list", method: "POST", data: params });

// 更新项目
export const updateItemApi = (id: number, params: Omit<ListItem, 'id'>): Promise<AxiosResponse<ItemResponse>> =>
  request({ url: `/api/list/${id}`, method: "PUT", data: params });

// 删除项目
export const deleteItemApi=(id: number) : Promise<AxiosResponse<ListResponse>> =>request({
        url: `/api/list/${id}`,
        method: 'DELETE'
    }
  )
