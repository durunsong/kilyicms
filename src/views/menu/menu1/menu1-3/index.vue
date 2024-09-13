<template>
  <div class="app-container">
    <el-card :header="t('third_level_routing') + ' - menu1-3'">
      <el-input v-model="text" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineOptions({
  name: "Menu1-3",
});

const text = ref("");
</script>
