<template>
  <div>
    <div>
      <Pagination></Pagination>
      <!-- svg组件测试 -->
      <svg>
        <use xlink:href="#icon-phone" />
      </svg>
      <svg-icon name="phone" width="20" height="20" color="pink" />
    </div>
    <h2>useAttrs</h2>
    <el-button type="primary" size="small" :icon="Edit" />
    <!-- 自定义组件 -->
    <DrButton type="primary" size="small" :icon="Edit" title="按钮提示" @click="() => alert('click')"></DrButton>
  </div>
</template>

<script setup lang="ts">
import { Edit } from "@element-plus/icons-vue";
import DrButton from "../../components/DrButton.vue";
</script>

<style scoped></style>
