import { type App, type Component } from "vue";
// 引入项目中全部的全局组件
import SvgIcon from "./SvgIcon/index.vue";
// import Pagination from "./Pagination/index.vue";

// 全局对象
const allGlobalComponents: Record<string, Component> = {
  SvgIcon
  // Pagination,
};

// 对外暴露插件对象
export default {
  // install方法
  install(app: App) {
    // console.log("99999--", app);
    // 注册项目中全部的全局组件
    Object.keys(allGlobalComponents).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponents[key]);
    });
  }
};
