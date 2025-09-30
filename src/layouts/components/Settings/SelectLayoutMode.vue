<template>
  <div class="select-layout-mode">
    <el-tooltip :content="t('Left_side_mode')">
      <el-container class="layout-mode left" :class="{ active: isLeft }" @click="setLayoutMode(LayoutModeEnum.Left)">
        <el-aside></el-aside>
        <el-container>
          <el-header></el-header>
          <el-main></el-main>
        </el-container>
      </el-container>
    </el-tooltip>
    <el-tooltip :content="t('Top_mode')">
      <el-container class="layout-mode top" :class="{ active: isTop }" @click="setLayoutMode(LayoutModeEnum.Top)">
        <el-header></el-header>
        <el-main></el-main>
      </el-container>
    </el-tooltip>
    <el-tooltip :content="t('mixed_mode')">
      <el-container
        class="layout-mode left-top"
        :class="{ active: isLeftTop }"
        @click="setLayoutMode(LayoutModeEnum.LeftTop)"
      >
        <el-header></el-header>
        <el-container>
          <el-aside></el-aside>
          <el-main></el-main>
        </el-container>
      </el-container>
    </el-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { useLayoutMode } from "@/hooks/useLayoutMode";
import { LayoutModeEnum } from "@/constants/app-key";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { isLeft, isTop, isLeftTop, setLayoutMode } = useLayoutMode();
</script>

<style lang="scss" scoped>
.select-layout-mode {
  display: flex;
  justify-content: space-between;
}

.layout-mode {
  width: 60px;
  flex-grow: 0;
  overflow: hidden;
  cursor: pointer;
  border-radius: 6px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid var(--el-color-primary);
  }
}

.active {
  border: 2px solid var(--el-color-primary);
}

.el-header {
  height: 12px;
}

.el-aside {
  width: 16px;
}

.left {
  .el-header {
    background-color: var(--el-fill-color-darker);
  }

  .el-aside {
    background-color: var(--el-color-primary);
  }

  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}

.top {
  .el-header {
    background-color: var(--el-color-primary);
  }

  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}

.left-top {
  .el-header {
    background-color: var(--el-fill-color-darker);
  }

  .el-aside {
    background-color: var(--el-color-primary);
  }

  .el-main {
    background-color: var(--el-fill-color-lighter);
  }
}
</style>
