<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <div class="content">
        <Logo v-if="showLogo" :collapse="false" class="logo"></Logo>
        <NavigationBar class="navigation-bar"></NavigationBar>
      </div>
      <TagsView v-show="showTagsView"></TagsView>
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 页面主体内容 -->
      <AppMain class="app-main"></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import { AppMain, NavigationBar, TagsView, Logo } from "./components";

const settingsStore = useSettingsStore();
const { showTagsView, showLogo } = storeToRefs(settingsStore);
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

  .logo {
    width: var(--kilyicms-sidebar-width);
  }

  .content {
    display: flex;

    .navigation-bar {
      flex: 1;
    }
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

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--kilyicms-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--kilyicms-header-height);
  }
}
</style>
