import { createRouter, createWebHistory } from "vue-router";
import { CustomRouteRecordRaw } from "@/types/routerType";

export const routes: Array<CustomRouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    label: "主页",
    meta: {
      title: "主页",
      hidden: false,
      icon: "House",
    },
    component: () => import("@/views/home/index.vue"),
    // 首页重定向页面
    redirect: "/home/data_conversion/statement1",
    children: [
      {
        label: "个人中心",
        path: "mine",
        name: "mine",
        meta: {
          title: "个人中心",
          hidden: false,
          icon: "User",
        },
        component: () => import("@/views/userCenter/userView.vue"),
        children: [
          {
            path: "setting",
            name: "setting",
            label: "用户管理",
            meta: {
              title: "用户管理",
              hidden: false,
              icon: "UserFilled",
            },
            component: () => import("@/views/userCenter/userList.vue"),
          },
          {
            path: "user_recycle_bin",
            name: "user_recycle_bin",
            label: "用户回收站",
            meta: {
              title: "用户回收站",
              hidden: false,
              icon: "DeleteFilled",
            },
            component: () => import("@/views/userCenter/user_recycle_bin.vue"),
          },
        ],
      },
      {
        label: "富文本总结",
        path: "rich_text",
        name: "rich_text",
        meta: {
          title: "富文本总结",
          hidden: true,
          icon: "UserFilled",
        },
        component: () => import("@/views/rich_text/rich_text_view.vue"),
        children: [
          {
            path: "wang",
            name: "wang",
            label: "@wang富文本",
            meta: {
              title: "@wang富文本",
              hidden: false,
              icon: "UserFilled",
            },
            component: () => import("@/views/rich_text/wang_one.vue"),
          },
        ],
      },
      {
        label: "AntV",
        path: "AntV",
        name: "AntV",
        meta: {
          title: "AntV",
          hidden: false,
          icon: "Operation",
        },
        component: () => import("@/views/g6/index.vue"),
        children: [
          {
            path: "g6-1",
            name: "g6演示",
            label: "g6-1",
            meta: {
              title: "g6演示",
              hidden: false,
              icon: "Stopwatch",
            },
            component: () => import("@/views/g6/g6-1.vue"),
          },
        ],
      },
      {
        label: "笔记",
        path: "notes",
        name: "notes",
        meta: {
          title: "笔记",
          hidden: false,
          icon: "Calendar",
        },
        component: () => import("@/views/learn_notes/index.vue"),
        children: [
          {
            path: "note_one",
            name: "note_one",
            label: "笔记1",
            meta: {
              title: "@笔记1",
              hidden: false,
              icon: "Bowl",
            },
            component: () => import("@/views/learn_notes/note_one.vue"),
          },
          {
            path: "note_two",
            name: "note_two",
            label: "笔记2",
            meta: {
              title: "@笔记2",
              hidden: false,
              icon: "Sugar",
            },
            component: () => import("@/views/learn_notes/note_two.vue"),
          },
          {
            path: "note_three",
            name: "note_three",
            label: "笔记3",
            meta: {
              title: "@笔记3",
              hidden: false,
              icon: "MilkTea",
            },
            component: () => import("@/views/learn_notes/note_three.vue"),
          },
        ],
      },
      {
        label: "数据转化",
        path: "data_conversion",
        name: "data_conversion",
        meta: {
          title: "数据转化",
          hidden: true,
          icon: "Tickets",
        },
        component: () => import("@/views/data_conversion/index.vue"),
        children: [
          {
            path: "statement1",
            name: "statement1",
            label: "数据报表1",
            meta: {
              title: "数据报表1",
              hidden: false,
              icon: "TrendCharts",
            },
            component: () => import("@/views/data_conversion/statement1.vue"),
          },
        ],
      },
    ],
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("@/views/AboutView.vue"),
  // },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "哦豁!404",
    },
    component: () => import("@/views/notFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// router.afterEach((to, from, next) => {
//   if (typeof to.meta?.title === "string") {
//     document.title = to.meta?.title;
//   } else {
//     return true;
//   }
// });

// router.beforeEach((to, from) => {
//   if (to.fullPath === "/login") {
//     //已经登录了,直接跳到home页面
//     if (localStorage.getItem("token")) {
//       return {
//         path: "/home",
//       };
//     }
//     return true;
//   } else if (localStorage.getItem("token")) {
//     //已经登录了,直接跳转
//     return true;
//   } else {
//     return {
//       //如果没有登陆就跳转到登录页面
//       path: "/login",
//     };
//   }
// });

export default router;
