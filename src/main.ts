// css
import '@/assets/base.scss'
import "element-plus/theme-chalk/dark/css-vars.css";
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register' // svg


import { setupStore } from "@/store";
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
// 全局引入组件方法
import globalComponents from '@/components/index';

const app = createApp(App)

setupStore(app)

app.use(router)
app.use(i18n)
app.use(ElementPlus)
app.use(globalComponents)

app.mount('#kilyimall')


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
