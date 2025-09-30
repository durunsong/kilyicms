<template>
  <div>
    <p>{{ $t("stunRequestInfo") }}</p>
    <el-row>
      <el-col :span="24">
        <h4>
          {{ $t("webrtcPublicIp", { webrtc: "WebRTC" }) }}&ensp;
          <span>{{ webrtcIp }}</span>
        </h4>
      </el-col>
      <el-col :span="24">
        <h4>
          {{ $t("ipifyPublicIp", { ipify: "ipify" }) }}&ensp;
          <span>{{ ipifyIp }}</span>
        </h4>
      </el-col>
    </el-row>
    <p :class="comparisonResultClass">{{ comparisonResult.message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";

const { t } = useI18n();

const ipifyIp = ref<string>("");
const webrtcIp = ref<string>("");
const comparisonResult = ref<{ key: string; message: string }>({
  key: "",
  message: ""
});

const comparisonResultClass = computed(() =>
  comparisonResult.value.key === "MATCH" ? "text-sky-500 font-bold text-xl" : "text-red-500 font-bold text-xl"
);

// 获取 WebRTC 的 IP 地址
const getWebrtcIP = (): Promise<string> =>
  new Promise((resolve) => {
    const ipDups: Record<string, boolean> = {};
    const RTCPeerConnection =
      window.RTCPeerConnection || (window as any).mozRTCPeerConnection || (window as any).webkitRTCPeerConnection;
    if (!RTCPeerConnection) {
      console.error("WebRTC is not supported by your browser.");
      return;
    }
    const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    const pc = new RTCPeerConnection(servers);
    pc.onicecandidate = (ice) => {
      if (ice.candidate) {
        const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate);
        if (ipMatch && !ipDups[ipMatch[1]]) {
          ipDups[ipMatch[1]] = true;
          resolve(ipMatch[1]);
        }
      }
    };
    pc.createDataChannel("");
    pc.createOffer()
      .then((offer) => pc.setLocalDescription(offer))
      .catch((err) => console.error("Error creating WebRTC offer", err));
    setTimeout(() => {
      pc.localDescription?.sdp.split("\n").forEach((line) => {
        if (line.startsWith("a=candidate:")) {
          const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(line);
          if (ipMatch && !ipDups[ipMatch[1]]) {
            ipDups[ipMatch[1]] = true;
            resolve(ipMatch[1]);
          }
        }
      });
    }, 2000);
  });

// 获取 ipify 的 IP 地址
const getIpifyIP = async () => {
  try {
    // 这里不能放在后端代理，因为后端代理的 IP 地址是固定的，无法获取到真实的客户端 IP 地址
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ipifyIp.value = data.ip;
  } catch (error) {
    ElMessage.error(t("ipifyError", { ipify: "ipify" }));
    console.error("Error fetching ipify:", error);
  }
};
// 比较 IP 地址
const compareIPs = async () => {
  await getIpifyIP();
  const webrtc = await getWebrtcIP();
  webrtcIp.value = webrtc;

  if (webrtc === ipifyIp.value) {
    comparisonResult.value = {
      key: "MATCH",
      message: "🟢" + t("comparisonMatch", { webrtc: "WebRTC", ipify: "ipify" }) + "✅"
    };
  } else {
    comparisonResult.value = {
      key: "MISMATCH",
      message: "🔴" + t("comparisonMismatch", { webrtc: "WebRTC", ipify: "ipify" }) + "❌"
    };
  }
};
onMounted(compareIPs);
</script>
