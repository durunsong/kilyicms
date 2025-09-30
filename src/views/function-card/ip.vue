<template>
  <div>
    <h2>{{ $t("detectionTitle", { keywords: "IP, VPN" }) }}</h2>
    <el-card shadow="hover">
      <div flex items-center justify-between>
        <h3 class="text-blue-500">
          🥝{{ $t("webrtcComparison", { webrtc: "WebRTC", ipify: "ipify" }) }}
          🔽
        </h3>
        <el-button type="primary" @click="reloadComponent" icon="Refresh">
          {{ $t("recheck") }}
        </el-button>
      </div>
      <div class="flex items-center gap-4">
        <WebrtcIp :key="componentKey"></WebrtcIp>
      </div>
    </el-card>
    <el-card shadow="hover">
      <div style="width: 100%">
        <div flex items-center justify-between>
          <h3 class="text-blue-500">
            🥝{{ $t("ipifyDetection", { ipify: "ipify", service: "proxycheck.io" }) }}
            🔽
          </h3>
          <el-button type="primary" @click="reloadComponentProxycheck" icon="Refresh">
            {{ $t("recheck") }}
          </el-button>
        </div>
        <div class="flex items-center gap-4">
          <Proxycheck :key="componentKeyProxycheck"></Proxycheck>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import WebrtcIp from "@/components/WebrtcIp/WebrtcIp.vue";
import Proxycheck from "@/components/WebrtcIp/Proxycheck.vue";

// 用于刷新组件的 key
const componentKey = ref(0);

const componentKeyProxycheck = ref(0);

// 重新加载组件
const reloadComponent = () => {
  componentKey.value++;
};

const reloadComponentProxycheck = () => {
  componentKeyProxycheck.value++;
};
</script>
<style scoped>
:deep(.el-card) {
  margin: 5px;
  display: flex;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  .el-card__body {
    width: 100%;
  }
}
</style>
