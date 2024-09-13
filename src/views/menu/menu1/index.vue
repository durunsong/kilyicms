<template>
  <div class="app-container">
    <h4>
      {{ t("route_caching_is_disabled") }}
      <el-link
        type="primary"
        href="https://github.com/durunsong/kilyicms/blob/main/src/config/route.ts"
        target="_blank"
      >
        src/config/route.ts
      </el-link>
    </h4>
    <el-card :header="t('second_level_routing') + '- menu1'">
      <router-view />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.el-link {
  font-size: 18px;
}
</style>
