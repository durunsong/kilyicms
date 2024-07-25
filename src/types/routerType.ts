import { RouteRecordRaw } from "vue-router";

interface CustomMeta {
  title: string;
  hidden?: boolean;
  icon?: string;
}

// 自定义label
export interface CustomRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  label?: string;
  meta?: CustomMeta;
}
