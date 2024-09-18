<template>
  <div>
    <!-- 全屏 -->
    <el-tooltip
      v-if="!content"
      effect="dark"
      :content="fullscreenTips"
      placement="bottom"
    >
      <SvgIcon
        :name="fullscreenSvgName"
        @click="handleFullscreenClick"
        :aria-hidden="false"
      />
    </el-tooltip>
    <!-- 内容区 -->
    <el-dropdown v-else :disabled="isFullscreen">
      <SvgIcon :name="contentLargeSvgName" />
      <template #dropdown>
        <el-dropdown-menu>
          <!-- 内容区放大 -->
          <el-dropdown-item @click="handleContentLargeClick">{{
            contentLargeTips
          }}</el-dropdown-item>
          <!-- 内容区全屏 -->
          <el-dropdown-item @click="handleContentFullClick">
            {{ t("Content_area_full_screen") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 定义 Props 接口，指定组件的输入属性
interface Props {
  /** 全屏的元素，默认是 html */
  element?: string;
  /** 打开全屏提示语 */
  openTips?: string;
  /** 关闭全屏提示语 */
  exitTips?: string;
  /** 是否只针对内容区 */
  content?: boolean;
}

// 使用 withDefaults 设置默认值，但移除 t() 的直接调用，避免报错
const props = withDefaults(defineProps<Props>(), {
  element: "html", // 默认全屏元素是 html
  content: false, // 默认不只针对内容区
});

// 使用 computed 动态计算 openTips 和 exitTips，避免直接在 props 中调用 t()
const openTips = computed(() => props.openTips || t("Enter_full_screen"));
const exitTips = computed(() => props.exitTips || t("Exit_full_screen"));

//#region 全屏
const isFullscreen = ref<boolean>(false); // 是否处于全屏状态

// 根据当前全屏状态设置提示文本
const fullscreenTips = computed(() => {
  return isFullscreen.value ? exitTips.value : openTips.value;
});

// 根据全屏状态设置 SVG 图标
const fullscreenSvgName = computed(() => {
  return isFullscreen.value ? "fullscreen-exit" : "fullscreen";
});

// 处理全屏点击事件
const handleFullscreenClick = () => {
  const dom = document.querySelector(props.element) || undefined;
  // 检查浏览器是否支持全屏
  screenfull.isEnabled
    ? screenfull.toggle(dom) // 支持则切换全屏
    : ElMessage.warning(t("browser_is_not_working"));
};

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen; // 更新全屏状态
  // 退出全屏时，清除所有的 class
  isFullscreen.value || (document.body.className = "");
};

// 自动监听和清理全屏变化事件
watchEffect((onCleanup) => {
  screenfull.isEnabled && screenfull.on("change", handleFullscreenChange); // 监听全屏变化
  onCleanup(() => {
    screenfull.isEnabled && screenfull.off("change", handleFullscreenChange); // 卸载组件时清理
  });
});
//#endregion

//#region 内容区
const isContentLarge = ref<boolean>(false); // 是否放大内容区

// 根据内容区状态设置提示文本
const contentLargeTips = computed(() => {
  return isContentLarge.value
    ? t("Content_area_recovery") // 放大时显示恢复提示
    : t("Content_area_enlargement"); // 默认显示放大提示
});

// 根据内容区状态设置 SVG 图标
const contentLargeSvgName = computed(() => {
  return isContentLarge.value ? "fullscreen-exit" : "fullscreen";
});

// 处理内容区放大点击事件
const handleContentLargeClick = () => {
  isContentLarge.value = !isContentLarge.value; // 切换内容区放大状态
  // 放大内容区时，将不需要的组件隐藏
  document.body.className = isContentLarge.value ? "content-large" : "";
};

// 处理内容区全屏点击事件
const handleContentFullClick = () => {
  // 如果内容区放大，则取消放大
  isContentLarge.value && handleContentLargeClick();
  // 内容区全屏时，将不需要的组件隐藏
  document.body.className = "content-full";
  // 开启全屏
  handleFullscreenClick();
};
//#endregion
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
