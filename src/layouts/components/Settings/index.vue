<template>
  <div class="setting-container">
    <h4>{{ t("Layout_configuration") }}</h4>
    <SelectLayoutMode></SelectLayoutMode>
    <el-divider></el-divider>
    <h4>{{ t("functional_configuration") }}</h4>
    <div
      class="setting-item"
      v-for="(settingValue, settingName, index) in switchSettings"
      :key="index"
    >
      <span class="setting-name">{{ settingName }}</span>
      <el-switch
        v-model="settingValue.value"
        :disabled="!isLeft && settingName === t('fixed_header')"
      ></el-switch>
    </div>
    <el-button type="danger" :icon="Refresh" @click="resetConfigLayout">
      {{ t("Reset_layout") }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { resetConfigLayout } from "@/utils";
import SelectLayoutMode from "./SelectLayoutMode.vue";
import { Refresh } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { isLeft } = useLayoutMode();
const settingsStore = useSettingsStore();

/** 使用 storeToRefs 将提取的属性保持其响应性 */
const {
  showTagsView,
  showLogo,
  fixedHeader,
  showFooter,
  showNotify,
  showThemeSwitch,
  showScreenfull,
  showSearchMenu,
  cacheTagsView,
  showWatermark,
  showGreyMode,
  showColorWeakness,
} = storeToRefs(settingsStore);

/** 定义 switch 设置项 */
const switchSettings = {
  [t("show_tab_bar")]: showTagsView,
  [t("show_logo")]: showLogo,
  [t("fixed_header")]: fixedHeader,
  [t("show_footer")]: showFooter,
  [t("show_notifications")]: showNotify,
  [t("show_theme_switch_button")]: showThemeSwitch,
  [t("show_fullscreen_button")]: showScreenfull,
  [t("show_search_button")]: showSearchMenu,
  [t("cache_tab_bar")]: cacheTagsView,
  [t("enable_watermark")]: showWatermark,
  [t("show_gray_mode")]: showGreyMode,
  [t("show_weak_mode")]: showColorWeakness,
};

/** 非左侧模式时，Header 都是 fixed 布局 */
watchEffect(() => {
  !isLeft.value && (fixedHeader.value = true);
});
</script>

<style lang="scss" scoped>
@use "@/styles/mixins";

.setting-container {
  padding: 20px;

  .setting-item {
    font-size: 14px;
    color: var(--el-text-color-regular);
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .setting-name {
      @extend %ellipsis;
    }
  }

  .el-button {
    margin-top: 40px;
    width: 100%;
  }
}
</style>
