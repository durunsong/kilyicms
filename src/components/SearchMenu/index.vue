<template>
  <div>
    <el-tooltip effect="dark" :content="t('search_menu')" placement="bottom">
      <SvgIcon name="search" @click="handleOpen" :aria-hidden="false"></SvgIcon>
    </el-tooltip>
    <SearchModal v-model="modalVisible"></SearchModal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SearchModal from "./SearchModal.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

/** 控制 modal 显隐 */
const modalVisible = ref<boolean>(false);
/** 打开 modal */
const handleOpen = () => {
  modalVisible.value = true;
};
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;

  &:focus {
    outline: none;
  }
}
</style>
