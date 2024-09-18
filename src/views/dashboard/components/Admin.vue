<template>
  <div class="app-container center">
    <PlaneSwitch
      v-model:checked="switchState"
      @update:checked="handleSwitchChange"
    />
    <p>Switch is {{ switchState ? "ON" : "OFF" }}</p>
    <el-empty :description="t('hello_admin_page', { admin: 'admin' })" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const switchState = ref(true);

// 处理子组件发出的开关状态变化事件
const handleSwitchChange = (newState: boolean) => {
  switchState.value = newState;
  console.log("Switch state changed to", newState);
};
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
