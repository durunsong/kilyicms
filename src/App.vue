<template>
  <el-config-provider :locale="elementLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme";
import { useElementPlusLocale } from "@/hooks/useElementPlusLocale";
// import { useDetectDevTools } from "@/hooks/useDetectDevTools";

/** 生产环境禁止用户在浏览器中调试 */
const VITE_MODE = import.meta.env.VITE_MODE;

if (VITE_MODE === "production") {
  // useDetectDevTools();
}

const { initTheme } = useTheme();

/** 使用Element Plus语言环境hooks */
const { elementLocale } = useElementPlusLocale();

/** 初始化主题 */
initTheme();
</script>
