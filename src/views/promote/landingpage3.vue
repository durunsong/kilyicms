<template>
    <div>
      <el-image v-for="(url, index) in imageUrls" :key="index" :src="url" :preview-src-list="imageUrls" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue';
  
  const imageUrls = reactive([
    require('@/assets/images/pkqiou.png'),
    require('@/assets/images/error.png'),
  ]);
  </script>
  
  <style scoped></style>
  