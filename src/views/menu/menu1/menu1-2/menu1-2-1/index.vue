<template>
  <div class="app-container">
    <el-card :header="t('four_level_routing_cache') + '- menu1-2-1'">
      <el-input v-model="text" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineOptions({
  name: "Menu1-2-1",
});

const text = ref("");
</script>
