// 将 Element Plus 的语言包引入到项目中 切换组件语言hooks
import { ref, watchEffect } from "vue";
import { langList } from "@/utils/langList";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData } from "@/utils/cache/local-storage";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import pl from "element-plus/es/locale/lang/pl";
import ro from "element-plus/es/locale/lang/ro";
import es from "element-plus/es/locale/lang/es";
import de from "element-plus/es/locale/lang/de";
import ar from "element-plus/es/locale/lang/ar";
import ko from "element-plus/es/locale/lang/ko";
import el from "element-plus/es/locale/lang/el";
import pt from "element-plus/es/locale/lang/pt";
import ru from "element-plus/es/locale/lang/ru";
import nl from "element-plus/es/locale/lang/nl";
import fr from "element-plus/es/locale/lang/fr";
import it from "element-plus/es/locale/lang/it";
import sv from "element-plus/es/locale/lang/sv";
import ja from "element-plus/es/locale/lang/ja";

// 从el_lang字段映射到实际的Element Plus语言导入
const elLocaleMap: Record<string, any> = {
  "zh-CN": zhCn,
  en: en,
  pl: pl,
  ro: ro,
  es: es,
  de: de,
  ar: ar,
  ko: ko,
  el: el,
  pt: pt,
  ru: ru,
  nl: nl,
  fr: fr,
  it: it,
  sv: sv,
  ja: ja,
};

export const useElementPlusLocale = () => {
  const elementLocale = ref(zhCn); // 默认语言

  const setElementLocale = () => {
    const localLang = getLocalData(CACHE_KEY.LOCAL_LANG) || "en"; // 默认设置英文
    const langObj = langList.find((lang) => lang.category === localLang);

    if (langObj && elLocaleMap[langObj.el_lang]) {
      elementLocale.value = elLocaleMap[langObj.el_lang];
    } else {
      elementLocale.value = elLocaleMap["en"]; // Fallback 默认英文
    }
  };

  watchEffect(() => {
    setElementLocale();
  });

  return {
    elementLocale,
  };
};
