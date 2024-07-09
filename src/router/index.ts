import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    redirect: "/login",
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
      name: "主页",
      title: "主页",
    },
    component: () => import("@/views/Home.vue"),
    children: [
      {
        label: "个人中心",
        path: "mine",
        name: "mine",
        meta: {
          name: "个人中心",
          title: "个人中心",
        },
        component: () => import("@/views/userCenter/userView.vue"),
        children: [
          {
            path: "setting",
            name: "setting",
            label: "个人设置",
            meta: {
              name: "个人设置",
              title: "个人设置",
            },
            component: () => import("@/views/userCenter/userList.vue"),
          }
        ],
      },
      {
        label: "富文本总结",
        path: "rich_text",
        name: "rich_text",
        meta: {
          name: "富文本总结",
          title: "富文本总结",
        },
        component: () => import("@/views/rich_text/rich_text_view.vue"),
        children: [
          {
            path: "wang",
            name: "wang",
            label: "@wang富文本",
            meta: {
              name: "@wang富文本",
              title: "@wang富文本",
            },
            component: () => import("@/views/rich_text/wang_one.vue"),
          },
        ],
      },
      {
        label: "vantV总结",
        path: "vantV",
        name: "vantV",
        meta: {
          name: "vantV总结",
          title: "vantV总结",
        },
        component: () => import("@/views/g6/index.vue"),
        children: [
          {
            path: "g6_1",
            name: "g6_1",
            label: "g6_1",
            meta: {
              name: "@g6_1",
              title: "@g6_1",
            },
            component: () => import("@/views/g6/g6_1.vue"),
          }]
        },
      {
        label: "总结笔记",
        path: "notes",
        name: "notes",
        meta: {
          name: "总结笔记",
          title: "总结笔记",
        },
        component: () => import("@/views/learn_notes/index.vue"),
        children: [
          {
            path: "note_one",
            name: "note_one",
            label: "笔记1",
            meta: {
              name: "@笔记1",
              title: "@笔记1",
            },
            component: () => import("@/views/learn_notes/note_one.vue"),
          },
          {
            path: "note_two",
            name: "note_two",
            label: "笔记2",
            meta: {
              name: "@笔记2",
              title: "@笔记2",
            },
            component: () => import("@/views/learn_notes/note_two.vue"),
          },
          {
            path: "note_three",
            name: "note_three",
            label: "笔记3",
            meta: {
              name: "@笔记3",
              title: "@笔记3",
            },
            component: () => import("@/views/learn_notes/note_three.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "哦豁!找不到对象啦!!!",
    },
    component: () => import("@/views/notFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.afterEach((to, from, next) => {
  if (typeof to.meta?.title === "string") {
    document.title = to.meta?.title;
  } else {
    return true;
  }
});

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
