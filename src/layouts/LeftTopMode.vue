<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <Logo v-if="showLogo" :collapse="false" class="logo"></Logo>
      <div class="content">
        <NavigationBar></NavigationBar>
        <TagsView v-show="showTagsView"></TagsView>
      </div>
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 左侧边栏 -->
      <Sidebar class="sidebar-container"></Sidebar>
      <!-- 页面主体内容 -->
      <AppMain class="app-main"></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
import { AppMain, NavigationBar, Sidebar, TagsView, Logo } from "./components";

const appStore = useAppStore();
const settingsStore = useSettingsStore();
const { showTagsView, showLogo } = storeToRefs(settingsStore);

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
  };
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @extend %clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  display: flex;

  .logo {
    width: var(--kilyicms-sidebar-width);
  }

  .content {
    flex: 1;
    position: relative;
  }
}

.layout-header {
  background-color: var(--kilyicms-header-bg-color);
  box-shadow: var(--kilyicms-header-box-shadow);
  border-bottom: var(--kilyicms-header-border-bottom);
}

.main-container {
  min-height: 100%;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--kilyicms-sidebar-width) !important;
  height: 100%;
  position: fixed;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  // border-right: var(--kilyicms-sidebar-border-right);
  padding-top: var(--kilyicms-navigationbar-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--kilyicms-navigationbar-height);
  padding-left: var(--kilyicms-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hideSidebar {
  .sidebar-container {
    width: var(--kilyicms-sidebar-hide-width) !important;
  }

  .app-main {
    padding-left: var(--kilyicms-sidebar-hide-width);
  }
}

.hasTagsView {
  .sidebar-container {
    padding-top: var(--kilyicms-header-height);
  }

  .app-main {
    padding-top: var(--kilyicms-header-height);
  }
}
</style>
