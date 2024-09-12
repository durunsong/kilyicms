<template>
  <footer class="layout-footer">
    MIT © 2024-PRESENT {{ VITE_APP_TITLE }}
  </footer>
</template>

<script lang="ts" setup>
const VITE_APP_TITLE = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-placeholder);
}
</style>
