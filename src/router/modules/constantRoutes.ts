/***
 * @常量路由
 */
import { CustomRouteRecordRaw } from "@/types/routerType";
export const Layout = () => import("@/views/Layout/index.vue")

export const constantRoutes: Array<CustomRouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
        name: "home",
        label: 'router_home',
        meta: {
            title: 'router_home',
            hidden: false,
            icon: "House",
        },
        component: Layout,
        children: [
            {
                path: "home",
                name: "homePage",
                meta: { title: "首页", icon: "HomeFilled", hidden: false },
                component: () => import("@/views/home/index.vue"),
            },
        ],
    },
    {
        path: "/login",
        meta: {
            title: 'router_login',
        },
        component: () => import("@/views/login/index.vue"),
    },
];
