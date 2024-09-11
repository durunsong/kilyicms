// core
import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
import router from "@/router";
import "@/router/permission";
// 批量自定义引入组件
import { loadPlugins } from "@/plugins";
// 指令
import { loadDirectives } from "@/directives";
// css
import "uno.css";
import "normalize.css";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/index.scss";
// svg
import "virtual:svg-icons-register";
// i18n国际化
import i18n from "@/i18n";
// 全局引入组件方法
import globalComponents from "@/components/index";

const app = createApp(App);

// 加载插件
loadPlugins(app);
// 加载自定义指令
loadDirectives(app);
app.use(i18n);
app.use(store);
app.use(router);
app.use(globalComponents);
router.isReady().then(() => {
  app.mount("#__kilyicms");
});
