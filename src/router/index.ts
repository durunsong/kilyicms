import { type RouteRecordRaw, createRouter } from "vue-router";
import { history, flatMultiLevelRoutes } from "./helper";
import routeSettings from "@/config/route";

const Layouts = () => import("@/layouts/index.vue");

/**
 * 常驻路由
 * 除了 redirect/403/404/login 等隐藏页面，其他页面建议设置 Name 属性
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: ":path(.*)",
        component: () => import("@/views/redirect/index.vue"),
      },
    ],
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
    alias: "/:pathMatch(.*)*",
  },
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

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: "/menu",
    component: Layouts,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "router_Multilevel_routing",
      svgIcon: "menu",
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/menu/menu1/index.vue"),
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "router_menu1",
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/menu/menu1/menu1-1/index.vue"),
            name: "Menu1-1",
            meta: {
              title: "router_menu1_1",
              keepAlive: true,
            },
          },
          {
            path: "menu1-2",
            component: () => import("@/views/menu/menu1/menu1-2/index.vue"),
            redirect: "/menu/menu1/menu1-2/menu1-2-1",
            name: "Menu1-2",
            meta: {
              title: "router_menu1_2",
            },
            children: [
              {
                path: "menu1-2-1",
                component: () =>
                  import("@/views/menu/menu1/menu1-2/menu1-2-1/index.vue"),
                name: "Menu1-2-1",
                meta: {
                  title: "router_menu1_2_1",
                  keepAlive: true,
                },
              },
              {
                path: "menu1-2-2",
                component: () =>
                  import("@/views/menu/menu1/menu1-2/menu1-2-2/index.vue"),
                name: "Menu1-2-2",
                meta: {
                  title: "router_menu1_2_2",
                  keepAlive: true,
                },
              },
            ],
          },
          {
            path: "menu1-3",
            component: () => import("@/views/menu/menu1/menu1-3/index.vue"),
            name: "Menu1-3",
            meta: {
              title: "router_menu1_3",
              keepAlive: true,
            },
          },
        ],
      },
      {
        path: "menu2",
        component: () => import("@/views/menu/menu2/index.vue"),
        name: "Menu2",
        meta: {
          title: "router_menu2",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/website",
    component: Layouts,
    redirect: "/website/mine",
    name: "website",
    meta: {
      title: "router_Site_Configuration",
      svgIcon: "website",
      roles: ["admin"],
    },
    children: [
      {
        path: "mine",
        name: "mine",
        redirect: "/website/mine/setting",
        meta: {
          title: "router_user",
          elIcon: "User",
          roles: ["admin"],
          alwaysShow: true,
        },
        component: () => import("@/views/userCenter/index.vue"),
        children: [
          {
            path: "setting",
            name: "setting",
            meta: {
              title: "router_user_management",
              elIcon: "UserFilled",
              roles: ["admin"],
            },
            component: () => import("@/views/userCenter/user/userList.vue"),
          },
          {
            path: "user_recycle_bin",
            name: "user_recycle_bin",
            meta: {
              title: "router_user_recycle_bin",
              hidden: false,
              elIcon: "DeleteFilled",
            },
            component: () =>
              import("@/views/userCenter/user/user_recycle_bin.vue"),
          },
        ],
      },
    ],
  },
  // {
  //   path: "/permission",
  //   component: Layouts,
  //   redirect: "/permission/page",
  //   name: "Permission",
  //   meta: {
  //     title: "router_Authority_case",
  //     svgIcon: "lock",
  //     roles: ["admin", "editor"], // 可以在根路由中设置角色
  //     alwaysShow: true, // 将始终显示根菜单
  //   },
  //   children: [
  //     {
  //       path: "page",
  //       component: () => import("@/views/permission/page.vue"),
  //       name: "PagePermission",
  //       meta: {
  //         title: "router_Page_level_authority",
  //         roles: ["admin"], // 或者在子导航中设置角色
  //       },
  //     },
  //     {
  //       path: "directive",
  //       component: () => import("@/views/permission/directive.vue"),
  //       name: "DirectivePermission",
  //       meta: {
  //         title: "router_Button_level_authority", // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
  //       },
  //     },
  //   ],
  // },
];

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache
    ? flatMultiLevelRoutes(constantRoutes)
    : constantRoutes,
});

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route;
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router;
