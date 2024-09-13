<template>
  <div class="app-container">
    <SwitchRoles />
    <el-tag type="warning" size="large">{{
      t("admin_role_is_visible")
    }}</el-tag>
  </div>
</template>

<script lang="ts" setup>
import SwitchRoles from "./components/SwitchRoles.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.el-tag {
  margin-top: 15px;
}
</style>
