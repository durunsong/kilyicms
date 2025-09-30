<template>
  <div class="search-footer">
    <template v-if="!isMobile">
      <span class="search-footer-item">
        <SvgIcon name="keyboard-enter"></SvgIcon>
        <span>{{ t("confirm_ok_text") }}</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-up"></SvgIcon>
        <SvgIcon name="keyboard-down"></SvgIcon>
        <span>{{ t("switch") }}</span>
      </span>
      <span class="search-footer-item">
        <SvgIcon name="keyboard-esc"></SvgIcon>
        <span>{{ t("close") }}</span>
      </span>
    </template>
    <span class="search-footer-total">{{ t("total_items", { count: props.total }) }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useDevice } from "@/hooks/useDevice";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
interface Props {
  total: number;
}

const props = defineProps<Props>();

const { isMobile } = useDevice();
</script>

<style lang="scss" scoped>
.search-footer {
  display: flex;
  color: var(--el-text-color-secondary);
  font-size: 14px;

  &-item {
    display: flex;
    align-items: center;
    margin-right: 12px;

    .svg-icon {
      margin-right: 5px;
      padding: 2px;
      font-size: 20px;
      background-color: var(--el-fill-color);
    }
  }

  &-total {
    margin: 0 0 0 auto;
  }
}
</style>
