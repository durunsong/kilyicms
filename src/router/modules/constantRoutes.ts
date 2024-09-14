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
    path: "/hook-demo",
    component: Layouts,
    redirect: "/hook-demo/use-fetch-select",
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
