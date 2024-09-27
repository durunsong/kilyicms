<template>
  <el-dropdown trigger="click">
    <div class="mr-5px">
      <SvgIcon name="switch-theme" width="24" height="24"></SvgIcon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          @click="
            (e: MouseEvent) => {
              handleChangeTheme(e, theme.name);
            }
          "
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { type ThemeName, useTheme } from "@/hooks/useTheme";

const { themeList, activeThemeName, setTheme } = useTheme();

const handleChangeTheme = (
  { clientX, clientY }: MouseEvent,
  themeName: ThemeName,
) => {
  const maxRadius = Math.hypot(
    Math.max(clientX, window.innerWidth - clientX),
    Math.max(clientY, window.innerHeight - clientY),
  );
  const style = document.documentElement.style;
  style.setProperty("--kilyicms-theme-x", clientX + "px");
  style.setProperty("--kilyicms-theme-y", clientY + "px");
  style.setProperty("--kilyicms-theme-r", maxRadius + "px");
  const handler = () => {
    setTheme(themeName);
  };

  document.startViewTransition
    ? document.startViewTransition(handler)
    : handler();
};
</script>
