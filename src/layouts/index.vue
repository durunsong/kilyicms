<template>
  <div :class="classes">
    <!-- 左侧模式 -->
    <LeftMode v-if="isLeft || isMobile"></LeftMode>
    <!-- 顶部模式 -->
    <TopMode v-else-if="isTop"></TopMode>
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="isLeftTop"></LeftTopMode>
    <!-- 右侧设置面板 -->
    <RightPanel v-if="showSettings">
      <Settings></Settings>
    </RightPanel>
  </div>
</template>

<script lang="ts" setup>
import { computed, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import useResize from "./hooks/useResize";
import { useWatermark } from "@/hooks/useWatermark";
import { useDevice } from "@/hooks/useDevice";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import LeftMode from "./LeftMode.vue";
import TopMode from "./TopMode.vue";
import LeftTopMode from "./LeftTopMode.vue";
import { Settings, RightPanel } from "./components";
import { getCssVariableValue, setCssVariableValue } from "@/utils";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData } from "@/utils/cache/local-storage";

/** Layout 布局响应式 */
useResize();

// 暂时这样用
const userInfo: any = getLocalData(CACHE_KEY.USER_INFO);

const { setWatermark, clearWatermark } = useWatermark();
const { isMobile } = useDevice();
const { isLeft, isTop, isLeftTop } = useLayoutMode();
const settingsStore = useSettingsStore();
const {
  showSettings,
  showTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness,
} = storeToRefs(settingsStore);

const classes = computed(() => {
  return {
    showGreyMode: showGreyMode.value,
    showColorWeakness: showColorWeakness.value,
  };
});

//#region 隐藏标签栏时删除其高度，是为了让 Logo 组件高度和 Header 区域高度始终一致
const cssVariableName = "--kilyicms-tagsview-height";
const kyTagsviewHeight = getCssVariableValue(cssVariableName);
watchEffect(() => {
  showTagsView.value
    ? setCssVariableValue(cssVariableName, kyTagsviewHeight)
    : setCssVariableValue(cssVariableName, "0px");
});
//#endregion

/** 开启或关闭系统水印 */
watchEffect(() => {
  showWatermark.value
    ? setWatermark(userInfo.userName ?? import.meta.env.VITE_APP_TITLE)
    : clearWatermark();
});
</script>

<style lang="scss" scoped>
.showGreyMode {
  filter: grayscale(1);
}

.showColorWeakness {
  filter: invert(0.8);
}
</style>
