import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { CustomRouteRecordRaw } from "@/types/routerType";

export const routes: Array<CustomRouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    meta: {
      title: 'router_login',
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    label: 'router_home',
    meta: {
      title: 'router_home',
      hidden: false,
      icon: "House",
    },
    component: () => import("@/views/home/index.vue"),
    // 首页重定向页面
    redirect: "/home/data_conversion/statement1",
    children: [
      {
        label: "router_user",
        path: "mine",
        name: "mine",
        meta: {
          title: "router_user",
          hidden: false,
          icon: "User",
        },
        redirect: "/home/mine/setting",
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
      {
        label: "router_office_use",
        path: "rich_text",
        name: "rich_text",
        meta: {
          title: "router_office_use",
          hidden: false,
          icon: "Edit",
        },
        redirect: "/home/rich_text/wang",
        component: () => import("@/views/rich_text/rich_text_view.vue"),
        children: [
          {
            path: "wang",
            name: "wang",
            label: "router_wang_rich_text",
            meta: {
              title: "router_wang_rich_text",
              hidden: false,
              icon: "EditPen",
            },
            component: () => import("@/views/rich_text/wang_one.vue"),
          },
        ],
      },
      {
        label: "router_AntV",
        path: "AntV",
        name: "AntV",
        meta: {
          title: "router_AntV",
          hidden: false,
          icon: "Operation",
        },
        redirect: "/home/AntV/g6-1",
        component: () => import("@/views/g6/index.vue"),
        children: [
          {
            path: "g6-1",
            name: "router_g6_Demo1",
            label: "router_g6_Demo1",
            meta: {
              title: "router_g6_Demo1",
              hidden: false,
              icon: "Stopwatch",
            },
            component: () => import("@/views/g6/g6-1.vue"),
          },
          {
            path: "g6-2",
            name: "router_g6_Demo2",
            label: "router_g6_Demo2",
            meta: {
              title: "router_g6_Demo2",
              hidden: false,
              icon: "Stopwatch",
            },
            component: () => import("@/views/g6/g6-2.vue"),
          },
        ],
      },
      {
        label: "router_note",
        path: "notes",
        name: "notes",
        meta: {
          title: "router_note",
          hidden: false,
          icon: "Calendar",
        },
        redirect: "/home/notes/note_one",
        component: () => import("@/views/learn_notes/index.vue"),
        children: [
          {
            path: "note_one",
            name: "note_one",
            label: "router_note1",
            meta: {
              title: "router_note1",
              hidden: false,
              icon: "Bowl",
            },
            component: () => import("@/views/learn_notes/note_one.vue"),
          },
          {
            path: "note_two",
            name: "note_two",
            label: "router_note2",
            meta: {
              title: "router_note2",
              hidden: false,
              icon: "Sugar",
            },
            component: () => import("@/views/learn_notes/note_two.vue"),
          },
          {
            path: "note_three",
            name: "note_three",
            label: "router_note3",
            meta: {
              title: "router_note3",
              hidden: false,
              icon: "MilkTea",
            },
            component: () => import("@/views/learn_notes/note_three.vue"),
          },
        ],
      },
      {
        label: "router_data_conversion",
        path: "data_conversion",
        name: "data_conversion",
        meta: {
          title: "router_data_conversion",
          hidden: true,
          icon: "Tickets",
        },
        redirect: "/home/data_conversion/statement1",
        component: () => import("@/views/data_conversion/index.vue"),
        children: [
          {
            path: "statement1",
            name: "statement1",
            label: "router_data_report1",
            meta: {
              title: "router_data_report1",
              hidden: false,
              icon: "TrendCharts",
            },
            component: () => import("@/views/data_conversion/statement1.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "wow!404",
    },
    component: () => import("@/views/notFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes as RouteRecordRaw[],
});

// router.afterEach((to, from, next) => {
//   if (typeof to.meta?.title === "string") {
//     document.title = to.meta?.title;
//   } else {
//     return true;
//   }
// });

router.beforeEach((to, from) => {
  if (to.fullPath === "/login") {
    //已经登录了,直接跳到home页面
    if (localStorage.getItem("token")) {
      return {
        path: "/home",
      };
    }
    return true;
  } else if (localStorage.getItem("token")) {
    //已经登录了,直接跳转
    return true;
  } else {
    return {
      //如果没有登陆就跳转到登录页面
      path: "/login",
    };
  }
});

export default router;
