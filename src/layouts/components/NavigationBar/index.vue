<template>
  <div class="navigation-bar">
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    ></Hamburger>
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb"></Breadcrumb>
    <Sidebar v-if="isTop && !isMobile" class="sidebar"></Sidebar>
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item"></SearchMenu>
      <Screenfull v-if="showScreenfull" class="right-menu-item"></Screenfull>
      <el-tooltip effect="dark" :content="t('Theme_Mode')" placement="bottom">
        <ThemeSwitch
          v-if="showThemeSwitch"
          class="right-menu-item"
        ></ThemeSwitch>
      </el-tooltip>
      <LanguageSwitcher></LanguageSwitcher>
      <Notify v-if="showNotify" class="right-menu-item"></Notify>
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :src="userInfo.avatar" :size="30"></el-avatar>
          <span>{{ userInfo.userName || userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://github.com/durunsong/kilyicms">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/du-runsong/kilyicms">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span block>{{ t("log_out") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
import { useUserStore } from "@/store/modules/user";
import Hamburger from "../Hamburger/index.vue";
import Breadcrumb from "../Breadcrumb/index.vue";
import Sidebar from "../Sidebar/index.vue";
import Notify from "@/components/Notify/index.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import Screenfull from "@/components/Screenfull/index.vue";
import SearchMenu from "@/components/SearchMenu/index.vue";
import { useDevice } from "@/hooks/useDevice";
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { useI18n } from "vue-i18n";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData } from "@/utils/cache/local-storage";

const { t } = useI18n();
const { isMobile } = useDevice();
const { isTop } = useLayoutMode();
const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();
const { showNotify, showThemeSwitch, showScreenfull, showSearchMenu } =
  storeToRefs(settingsStore);

// 暂时这样用
const userInfo: any = getLocalData(CACHE_KEY.USER_INFO);

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false);
};

/** 登出 */
const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--kilyicms-navigationbar-height);
  overflow: hidden;
  color: var(--kilyicms-navigationbar-text-color);
  display: flex;
  justify-content: space-between;

  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }

  .breadcrumb {
    flex: 1;

    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;

    :deep(.el-menu) {
      background-color: transparent;
    }

    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary) !important;
        }
      }
    }
  }

  .right-menu {
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
