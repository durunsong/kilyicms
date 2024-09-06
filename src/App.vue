<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { useDetectDevTools } from './hooks/useDetectDevTools';
// 禁止用户在浏览器中调试
const VITE_MODE = import.meta.env.VITE_MODE
if (VITE_MODE === 'production') {
  useDetectDevTools();
}

const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
