<template>
  <div class="screenfull_container">
    <div class="fullscreen" @click="onToggle">
      <SvgIcon :name="iconHref" width="32" height="32" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,watch, onMounted, onUnmounted, computed } from "vue";
import screenfull from "screenfull";
import { userPomotionStore } from "@/store";
const store = userPomotionStore();

const isFullscreen = ref<boolean>(store.is_screen_full);

watch(() => store.is_screen_full, (newVal) => {
  isFullscreen.value = newVal;
});

const change = () => {
  store.is_screen_full = screenfull.isFullscreen;
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
