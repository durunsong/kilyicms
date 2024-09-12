import { ref, watch } from "vue";
import i18n from "@/i18n";
const { t } = i18n.global;

/** 项目标题 */
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE ?? "kilyicms";

/** 动态标题 */
const dynamicTitle = ref<string>("");

/** 设置标题 */
const setTitle = (title: string) => {
  const titleText = t(title);
  dynamicTitle.value = titleText
    ? `${VITE_APP_TITLE} | ${titleText}`
    : VITE_APP_TITLE;
};

/** 监听标题变化 */
watch(dynamicTitle, (value, oldValue) => {
  if (document && value !== oldValue) {
    document.title = value;
  }
});

export function useTitle() {
  return { setTitle };
}
