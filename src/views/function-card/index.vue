<template>
  <div class="flex flex-col items-center">
    <el-card class="w-[400px] mt-5" shadow="always">
      <PlaneSwitch
        v-model:checked="switchState"
        @update:checked="handleSwitchChange"
      ></PlaneSwitch>
      <p>Switch is {{ switchState ? "ON" : "OFF" }}</p>
    </el-card>
    <el-card class="w-[400px]" shadow="always">
      <p>标签图标</p>
      <div
        class="i-whh-mymusic text-blue-400"
        role="img"
        aria-hidden="true"
      ></div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const switchState = ref(true);

// 处理子组件发出的开关状态变化事件
const handleSwitchChange = (newState: boolean) => {
  switchState.value = newState;
  console.log("Switch state changed to", newState);
};
</script>

<style scoped>
/* No additional styles needed as we're using UnoCSS utilities */
</style>
