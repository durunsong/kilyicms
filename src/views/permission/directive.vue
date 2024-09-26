<template>
  <div class="app-container">
    <SwitchRoles></SwitchRoles>
    <!-- v-permission 示例 -->
    <div class="margin-top-30">
      <div>
        <el-tag
          v-permission="['admin']"
          type="success"
          size="large"
          effect="plain"
        >
          {{ t("here_adopted") }} v-permission="['admin']"
          {{ t("so_only") }} admin {{ t("can_see_this_sentence") }}
        </el-tag>
      </div>
      <div>
        <el-tag
          v-permission="['user']"
          type="success"
          size="large"
          effect="plain"
        >
          {{ t("here_adopted") }} v-permission="['user']"
          {{ t("so_only") }} user {{ t("can_see_this_sentence") }}
        </el-tag>
      </div>
      <div class="margin-top-15">
        <el-tag
          v-permission="['admin', 'user']"
          type="success"
          size="large"
          effect="plain"
        >
          {{ t("here_adopted") }} v-permission="['admin', 'user']"
          {{ t("so") }} admin {{ t("and") }} user
          {{ t("can_see_the_words") }}
        </el-tag>
      </div>
    </div>
    <!-- checkPermission 示例 -->
    <div class="margin-top-30">
      <el-tag type="warning" size="large">
        {{ t("other_dynamically_rendered_Dom") }}{{ t("and") }} checkPermission
        {{ t("to_achieve") }}：
      </el-tag>
      <el-tabs type="border-card" class="margin-top-15">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          {{ t("here_adopted") }}
          <el-tag>v-if="checkPermission(['admin'])"</el-tag>
          {{ t("so_only") }} admin {{ t("can_see_this_sentence") }}
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['user'])" label="user">
          {{ t("here_adopted") }}
          <el-tag>v-if="checkPermission(['user'])"</el-tag>
          {{ t("so_only") }} user
          {{ t("can_see_this_sentence") }}
        </el-tab-pane>
        <el-tab-pane
          v-if="checkPermission(['admin', 'user'])"
          :label="'admin' + t('and') + 'user'"
        >
          {{ t("here_adopted") }}
          <el-tag>v-if="checkPermission(['admin', 'user'])"</el-tag>
          {{ t("so") }} admin {{ t("and") }} user {{ t("can_see_the_words") }}
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { checkPermission } from "@/utils/permission";
import SwitchRoles from "./components/SwitchRoles.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<style lang="scss" scoped>
.margin-top-15 {
  margin-top: 15px;
}

.margin-top-30 {
  margin-top: 30px;
}
</style>
