import { CustomRouteRecordRaw } from "@/types/routerType";

export const asyncRoutes: Array<CustomRouteRecordRaw> = [
  {
    label: "router_user",
    path: "/mine",
    name: "mine",
    meta: {
      title: "router_user",
      hidden: false,
      icon: "User",
    },
    redirect: "/mine/setting",
    component: () => import("@/views/userCenter/userView.vue"),
    children: [
      {
        path: "setting",
        name: "setting",
        label: "router_user_management",
        meta: {
          title: "router_user_management",
          hidden: false,
          icon: "UserFilled",
        },
        component: () => import("@/views/userCenter/userList.vue"),
      },
      {
        path: "user_recycle_bin",
        name: "user_recycle_bin",
        label: "router_user_recycle_bin",
        meta: {
          title: "router_user_recycle_bin",
          hidden: false,
          icon: "DeleteFilled",
        },
        component: () => import("@/views/userCenter/user_recycle_bin.vue"),
      },
    ],
  },
];
