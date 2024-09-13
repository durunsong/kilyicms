<template>
  <div class="app-container">
    <h4>
      {{ t("demo_description", { hook: "hook" }) }}
    </h4>
    <div ref="localRef" class="local" />
    <el-button-group>
      <el-button
        type="primary"
        @click="setWatermark(t('create_local_watermark'), { color: '#409eff' })"
        >{{ t("create_local_watermark") }}</el-button
      >
      <el-button
        type="warning"
        @click="
          setWatermark(t('disable_defense_local_watermark'), {
            color: '#e6a23c',
            defense: false,
          })
        "
      >
        {{ t("disable_defense_local_watermark") }}
      </el-button>
      <el-button type="danger" @click="clearWatermark">{{
        t("clear_local_watermark")
      }}</el-button>
    </el-button-group>
    <el-button-group>
      <el-button
        type="primary"
        @click="
          setGlobalWatermark(t('create_global_watermark'), { color: '#409eff' })
        "
        >{{ t("create_global_watermark") }}</el-button
      >
      <el-button
        type="warning"
        @click="
          setGlobalWatermark(t('disable_defense_global_watermark'), {
            color: '#e6a23c',
            defense: false,
          })
        "
      >
        {{ t("disable_defense_global_watermark") }}
      </el-button>
      <el-button type="danger" @click="clearGlobalWatermark">{{
        t("clear_global_watermark")
      }}</el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useWatermark } from "@/hooks/useWatermark";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const localRef = ref<HTMLElement | null>(null);
const { setWatermark, clearWatermark } = useWatermark(localRef);
const {
  setWatermark: setGlobalWatermark,
  clearWatermark: clearGlobalWatermark,
} = useWatermark();
</script>

<style lang="scss" scoped>
.local {
  height: 30vh;
  border: 2px dashed var(--el-color-primary);
  margin-bottom: 20px;
}

.el-button-group {
  margin-right: 12px;
}
</style>
