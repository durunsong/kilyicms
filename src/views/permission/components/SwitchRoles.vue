<template>
  <div>
    <div>{{ t("your_role") }}:{{ userStore.roles }}</div>
    <div class="switch-roles">
      <span>{{ t("switching_users") }} ：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" value="editor" />
        <el-radio-button label="admin" value="admin" />
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useUserStore } from "@/store/modules/user";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const userStore = useUserStore();
const switchRoles = ref(userStore.roles[0]);
watch(switchRoles, (value) => {
  userStore.changeRoles(value);
});
</script>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
