/** 统一处理 localStorage */
import CACHE_KEY from "@/constants/cache-key";
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key";
import { type ThemeName } from "@/hooks/useTheme";
import { type TagView } from "@/store/modules/tags-view";
import { type LayoutSettings } from "@/config/layouts";

/**
 * @通用方法
 * **/
// 通用的 get 方法，根据 key 获取 localStorage 的值，并解析成 JSON 格式
export const getLocalData = <T>(key: any): T | null => {
  const json = localStorage.getItem(key);
  return json ? (JSON.parse(json) as T) : null;
};

// 通用的 set 方法，根据 key 将值存储到 localStorage，值会被转换为 JSON 字符串
export const setLocalData = <T>(key: any, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 通用的 remove 方法，根据 key 删除 localStorage 中的对应项
export const removeLocalData = (key: any) => {
  localStorage.removeItem(key);
};

/**
 * @特殊处理
 * **/
//#region 系统布局配置
export const getConfigLayout = () => {
  const json = localStorage.getItem(CACHE_KEY.CONFIG_LAYOUT);
  return json ? (JSON.parse(json) as LayoutSettings) : null;
};
export const setConfigLayout = (settings: LayoutSettings) => {
  localStorage.setItem(CACHE_KEY.CONFIG_LAYOUT, JSON.stringify(settings));
};
export const removeConfigLayout = () => {
  localStorage.removeItem(CACHE_KEY.CONFIG_LAYOUT);
};
//#endregion

//#region 侧边栏状态
export const getSidebarStatus = () => {
  return localStorage.getItem(CACHE_KEY.SIDEBAR_STATUS);
};
export const setSidebarStatus = (
  sidebarStatus: SidebarOpened | SidebarClosed,
) => {
  localStorage.setItem(CACHE_KEY.SIDEBAR_STATUS, sidebarStatus);
};
//#endregion

//#region 正在应用的主题名称
export const getActiveThemeName = () => {
  return localStorage.getItem(CACHE_KEY.ACTIVE_THEME_NAME) as ThemeName | null;
};
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CACHE_KEY.ACTIVE_THEME_NAME, themeName);
};
//#endregion

//#region 标签栏
export const getVisitedViews = () => {
  const json = localStorage.getItem(CACHE_KEY.VISITED_VIEWS);
  return JSON.parse(json ?? "[]") as TagView[];
};
export const setVisitedViews = (views: TagView[]) => {
  views.forEach((view) => {
    // 删除不必要的属性，防止 JSON.stringify 处理到循环引用
    delete view.matched;
    delete view.redirectedFrom;
  });
  localStorage.setItem(CACHE_KEY.VISITED_VIEWS, JSON.stringify(views));
};
export const getCachedViews = () => {
  const json = localStorage.getItem(CACHE_KEY.CACHED_VIEWS);
  return JSON.parse(json ?? "[]") as string[];
};
export const setCachedViews = (views: string[]) => {
  localStorage.setItem(CACHE_KEY.CACHED_VIEWS, JSON.stringify(views));
};
//#endregion
