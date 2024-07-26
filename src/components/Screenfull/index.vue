<template>
  <div class="screenfull_container">
    <div class="fullscreen" @click="onToggle">
      <el-tooltip :effect="tooltipEffect" :content="tooltipContent" placement="bottom">
        <SvgIcon :name="iconHref" width="32" height="32" />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import screenfull from "screenfull";
import SvgIcon from "@/components/SvgIcon/index.vue";

const isFullscreen = ref<boolean>(false);

const change = () => {
  isFullscreen.value = screenfull.isFullscreen;
};

const onToggle = () => {
  screenfull.toggle();
};

onMounted(() => {
  screenfull.on("change", change);
});

onUnmounted(() => {
  screenfull.off("change", change);
});

const tooltipEffect = ref<string>("dark");
const tooltipContent = computed<string>(() => (isFullscreen.value ? "退出全屏" : "全屏"));
const iconHref = computed<string>(() => (isFullscreen.value ? "exit_full_screen" : "full_screen"));
</script>

<style lang="scss" scoped>
.screenfull_container {
  margin-right: 20px;
}

.fullscreen {
  cursor: pointer;
}
</style>
