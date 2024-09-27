import { createI18n } from "vue-i18n";
import messages from "@/i18n/package";
import { langList } from "@/utils/langList";
import CACHE_KEY from "@/constants/cache-key";
import {
  getLocalData,
  setLocalData,
  removeLocalData,
} from "@/utils/cache/local-storage";

// 支持的语言
const langListArr: string[] = langList.map((lang) => lang.category);

// 获取浏览器语言
const navLang: string = navigator.language.substring(0, 2);

// 获取本地存储的语言
let localLang: any = getLocalData(CACHE_KEY.LOCAL_LANG);

// 处理其他浏览器语言格式
if (localLang === "zh-cn" || localLang === "en-us") {
  removeLocalData(CACHE_KEY.LOCAL_LANG);
  localLang = "en";
}

// 选择语言
if (!langListArr.includes(localLang)) {
  if (langListArr.includes(navLang)) {
    localLang = navLang;
  } else {
    localLang = "en";
  }
  setLocalData(CACHE_KEY.LOCAL_LANG, localLang);
}

// 创建 i18n 实例
const i18n = createI18n({
  locale: localLang || "en", // 默认语言
  fallbackLocale: "en", // 后备语言(当 当前语言没有对应翻译时，使用该语言)
  legacy: false, // 解决报错的(vue3写法)
  globalInjection: true, // 全局注册$t方法
  allowComposition: true, // 允许组合式api
  messages,
});

export default i18n;
