import { CustomRouteRecordRaw } from "@/types/routerType";

export const anyRoutes: Array<CustomRouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    meta: {
      title: "wow!404"
    },
    component: () => import("@/views/notFound/index.vue")
  }
];
