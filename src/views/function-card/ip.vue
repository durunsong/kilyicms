<template>
  <div>
    <h2>{{ $t("detectionTitle", { keywords: "IP, VPN" }) }}</h2>
    <el-card shadow="hover">
      <div flex items-center justify-between>
        <h3 class="text-blue-500">
          {{ $t("webrtcComparison", { webrtc: "WebRTC", ipify: "ipify" }) }} 🔽
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
            {{
              $t("ipifyDetection", { ipify: "ipify", service: "proxycheck.io" })
            }}
            🔽
          </h3>
          <el-button
            type="primary"
            @click="reloadComponentProxycheck"
            icon="Refresh"
          >
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

const hudehfur = {
  detectionTitle: "用户 {keywords} 和 VPN/代理检测 (前后端解决方案)",
  webrtcComparison: "{webrtc} 和 {ipify} 对比判断案例",
  ipifyDetection: "{ipify} 检测的 IP 通过第三方服务判断 ({service})",
  recheck: "重新检测",
  stunRequestInfo:
    "该演示会秘密向 STUN 服务器发出请求，这些服务器会记录你的请求。这些请求不会显示在开发者控制台中，而且无法被浏览器插件（AdBlock、Ghostery 等）阻止。",
  webrtcPublicIp: "你的 {webrtc} 公网 IP 地址是:",
  ipifyPublicIp: "通过 {ipify} 获取的公网 IP 地址是:",
  comparisonMatch:
    "检测结果：{webrtc} 和 {ipify} 的 IP 地址相同，你没有使用 VPN/代理",
  comparisonMismatch:
    "检测结果：{webrtc} 和 {ipify} 的 IP 地址不同，你可能正在使用 VPN/代理",
  ipifyError: "获取 {ipify} IP 地址失败，请检查网络连接！",
  vpnCheckTitle: "代理/VPN 检测结果",
  ipifyCurrentIP: "ipify检测当前IP 地址:",
  proxyCheckRange: "proxycheck.io检测当前IP 范围:",
  proxyCheckProxy: "代理:",
  proxyCheckType: "类型:",
  proxyCheckProvider: "提供商:",
  proxyCheckCountry: "国家:",
  proxyCheckCity: "城市:",
  proxyCheckTimezone: "时区:",
  proxyCheckCoordinates: "经纬度:",
  dataLoading: "数据加载中，请稍后...",
  comparisonMatch_ss: "检测结果：通过{service}检测，你没有使用 VPN/代理",
  comparisonMismatch_ss: "检测结果：通过{service}检测，你可能正在使用 VPN/代理",
  ipFetchError: "获取 IP 地址失败。",
  proxyCheckError: "检测代理/VPN 失败。",
  proxyCheckStatusError: "检测失败，状态码错误。",
  errorOccurred: "发生错误:",
  genericError: "检测失败，请稍后重试。",
};
console.log(hudehfur);

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
