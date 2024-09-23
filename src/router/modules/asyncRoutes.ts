/***
 * @异步路由 (动态路由)
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
import { type RouteRecordRaw } from "vue-router";
const Layouts = () => import("@/layouts/index.vue");

export const asyncRoutes: RouteRecordRaw[] = [
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
            component: () =>
              import("@/views/userCenter/userManagement/userList.vue"),
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
              import("@/views/userCenter/userManagement/user_recycle_bin.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/permission",
    component: Layouts,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "router_Authority_case",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true, // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "router_Page_level_authority",
          roles: ["admin"], // 或者在子导航中设置角色
        },
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "router_Button_level_authority", // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        },
      },
    ],
  },
];
