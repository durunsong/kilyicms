<template>
  <div class="handle-button" @click="show = true">
    <el-icon :size="24">
      <Setting></Setting>
    </el-icon>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot></slot>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Setting } from "@element-plus/icons-vue";

interface Props {
  buttonTop?: number;
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350,
});

const buttonTopCss = props.buttonTop + "px";
const show = ref(false);
</script>

<style lang="scss" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  background-color: var(--kilyicms-rightpanel-button-bg-color);
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0;
  border-radius: 6px 0 0 6px;
  z-index: 10;
  cursor: pointer;
  pointer-events: auto;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
