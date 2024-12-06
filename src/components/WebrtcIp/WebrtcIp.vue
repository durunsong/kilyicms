<template>
  <div>
    <p>
      该演示会秘密向 STUN 服务器发出请求，这些服务器会记录你的请求。
      这些请求不会显示在开发者控制台中，而且无法被浏览器插件（AdBlock、Ghostery
      等）阻止。
    </p>
    <el-row>
      <el-col :span="24">
        <h4>
          你的 WebRTC 公网 IP 地址是:&ensp;
          <span>{{ webrtcIp }}</span>
        </h4>
      </el-col>
      <el-col :span="24">
        <h4>
          通过 ipify 获取的公网 IP 地址是:&ensp;
          <span>{{ ipifyIp }}</span>
        </h4>
      </el-col>
    </el-row>
    <p :class="comparisonResultClass">{{ comparisonResult.message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";

const ipifyIp = ref<string>("");
const webrtcIp = ref<string>("");
const comparisonResult = ref<{ key: string; message: string }>({
  key: "",
  message: "",
});

const comparisonResultClass = computed(() =>
  comparisonResult.value.key === "MATCH"
    ? "text-sky-500 font-bold text-xl"
    : "text-red-500 font-bold text-xl",
);

// 获取 WebRTC 的 IP 地址
const getWebrtcIP = (): Promise<string> =>
  new Promise((resolve) => {
    const ipDups: Record<string, boolean> = {};
    const RTCPeerConnection =
      window.RTCPeerConnection ||
      (window as any).mozRTCPeerConnection ||
      (window as any).webkitRTCPeerConnection;
    if (!RTCPeerConnection) {
      console.error("WebRTC is not supported by your browser.");
      return;
    }
    const servers = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };
    const pc = new RTCPeerConnection(servers);
    pc.onicecandidate = (ice) => {
      if (ice.candidate) {
        const ipMatch =
          /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
            ice.candidate.candidate,
          );
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
          const ipMatch =
            /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(
              line,
            );
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
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    ipifyIp.value = data.ip;
  } catch (error) {
    ElMessage.error("获取 ipify IP 地址失败，请检查网络连接！");
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
      message:
        "🟢检测结果：WebRTC 和 ipify 的 IP 地址相同，你没有使用 VPN/代理✅",
    };
  } else {
    comparisonResult.value = {
      key: "MISMATCH",
      message:
        "🔴检测结果：WebRTC 和 ipify 的 IP 地址不同，你可能正在使用 VPN/代理❌",
    };
  }
};
onMounted(compareIPs);
</script>
<style scoped>
.text-sky-500 {
  color: skyblue;
}
.text-red-500 {
  color: red;
}
.font-bold {
  font-weight: bold;
}
.text-xl {
  font-size: 1.25rem; /* 20px */
}
h4 {
  line-height: 1;
}
</style>
