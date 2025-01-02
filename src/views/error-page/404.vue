<template>
  <ErrorPageLayout>
    <Svg404></Svg404>
  </ErrorPageLayout>
</template>

<script lang="ts" setup>
import ErrorPageLayout from "./components/ErrorPageLayout.vue";
import Svg404 from "@/assets/error-page/404.svg"; // vite-svg-loader 插件的功能
</script>
