<template>
  <div class="app-container">
    <el-card :header="t('third_level_routing') + '- menu1-2'">
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
