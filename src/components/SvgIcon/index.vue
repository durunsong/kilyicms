<template>
  <svg class="svg-icon" :aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="svgId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    prefix?: string;
    name: string;
    color?: string;
    width?: number | string;
    height?: number | string;
  }>(),
  {
    prefix: "icon",
    color: "#111",
    width: 24,
    height: 24,
  },
);

const svgId = computed(() => `#${props.prefix}-${props.name}`);
//  vite.config.ts中配置路径
//  iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
</script>

<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
}
</style>
