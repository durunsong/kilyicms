<template>
  <div @click="toggleClick">
    <el-icon :size="26" class="icon">
      <Fold v-if="props.isActive"></Fold>
      <Expand v-else></Expand>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { Expand, Fold } from "@element-plus/icons-vue";

interface Props {
  isActive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isActive: false
});

const emit = defineEmits<{
  toggleClick: [];
}>();

const toggleClick = () => {
  emit("toggleClick");
};
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
  color: var(--kilyicms-hamburger-text-color);
}
</style>
