/***
 * @常量路由
 */
import { type RouteRecordRaw } from "vue-router";
const Layouts = () => import("@/layouts/index.vue");

export const constant_Routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
      title: "router_login",
    },
  },
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "router_home",
          svgIcon: "dashboard",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/unocss",
    component: Layouts,
    redirect: "/unocss/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/unocss/index.vue"),
        name: "UnoCSS",
        meta: {
          title: "router_UnoCSS",
          svgIcon: "unocss",
        },
      },
    ],
  },
  {
    path: "/function-card",
    component: Layouts,
    redirect: "/function-card/functions-and-components",
    name: "functionCard",
    meta: {
      title: "function_card",
      elIcon: "Grid",
      alwaysShow: true,
    },
    children: [
      {
        path: "functions-and-components",
        component: () => import("@/views/function-card/index.vue"),
        name: "FunctionsAndComponents",
        meta: {
          title: "router_Functions_and_Components",
        },
      },
    ],
  },
  {
    path: "/hook-demo",
    component: Layouts,
    redirect: "/hook-demo/use-fullscreen-loading",
    name: "HookDemo",
    meta: {
      title: "router_Hooks",
      elIcon: "Menu",
      alwaysShow: true,
    },
    children: [
      {
        path: "use-fullscreen-loading",
        component: () => import("@/views/hook-demo/use-fullscreen-loading.vue"),
        name: "UseFullscreenLoading",
        meta: {
          title: "router_useFullscreenLoading",
        },
      },
      {
        path: "use-watermark",
        component: () => import("@/views/hook-demo/use-watermark.vue"),
        name: "UseWatermark",
        meta: {
          title: "router_useWatermark",
        },
      },
    ],
  },
];
