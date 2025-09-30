import { type RouteRecordRaw, createRouter } from "vue-router";
import { history, flatMultiLevelRoutes } from "./helper";
import routeSettings from "@/config/route";
import { asyncRoutes } from "./modules/asyncRoutes";
import { anyRoutes } from "./modules/anyRoutes";
import { constant_Routes } from "./modules/constantRoutes";

/**
 * 常驻路由+任意路由
 */
export const constantRoutes: RouteRecordRaw[] = [
  // 常量路由
  ...constant_Routes,
  // 任意路由
  ...anyRoutes
];

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  // 动态路由
  ...asyncRoutes
];

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
});

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由必须带有 Name 属性，否则可能不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route;
      if (name && (meta.roles as Array<unknown>)?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router;
