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
import { useI18n } from "vue-i18n";
const { t } = useI18n();

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
const tooltipContent = computed<string>(() => (isFullscreen.value ? t('Exit_full_screen') : t('Enter_full_screen')));
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
