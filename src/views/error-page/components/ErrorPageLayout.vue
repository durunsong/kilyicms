<template>
  <div class="error-page">
    <div class="error-page-svg">
      <slot></slot>
    </div>
    <router-link to="/">
      <el-button type="primary">{{ t("back_home") }}</el-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.error-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-svg {
    width: 400px;
    margin-bottom: 50px;
  }
}
</style>
