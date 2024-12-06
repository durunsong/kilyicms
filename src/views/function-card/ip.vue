<template>
  <div>
    <h2>用户IP 和 VPN/代理检测</h2>
    <div flex uno-padding-5 flex-wrap>
      <el-card shadow="hover">
        <div flex items-center justify-between>
          <h3 class="text-blue-500">WebRTC 和 ipify 对比判断案例 🔽</h3>
          <el-button type="primary" @click="reloadComponent" icon="Refresh">
            重新检测
          </el-button>
        </div>
        <div class="flex items-center gap-4">
          <WebrtcIp :key="componentKey"></WebrtcIp>
        </div>
      </el-card>
      <el-card shadow="hover">
        <div flex items-center justify-between>
          <h3 class="text-blue-500">
            ipify 检测的IP通过第三方服务判断(eg: proxycheck.io) 🔽
          </h3>
          <el-button
            type="primary"
            @click="reloadComponentProxycheck"
            icon="Refresh"
          >
            重新检测
          </el-button>
        </div>
        <div class="flex items-center gap-4">
          <Proxycheck :key="componentKeyProxycheck"></Proxycheck>
        </div>
      </el-card>
    </div>
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
}
</style>
