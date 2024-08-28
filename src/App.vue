<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { useDetectDevTools } from './hooks/useDetectDevTools';
// 禁止用户在浏览器中调试
const VITE_MODE = import.meta.env.VITE_MODE
if (VITE_MODE === 'production') {
  useDetectDevTools();
}
</script>
<style lang="scss"></style>
