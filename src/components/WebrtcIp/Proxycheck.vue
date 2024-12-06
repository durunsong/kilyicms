<template>
  <div class="flex bg-gray-100">
    <el-card shadow="hover">
      <h2 class="text-lg font-bold mb-4">代理/VPN 检测</h2>
      <el-button type="primary" @click="onCheckIP">检测代理/VPN</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from "element-plus";

// 获取当前 IP 地址
const getCurrentIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    } else {
      throw new Error("获取 IP 地址失败");
    }
  } catch (error) {
    console.error(error);
    throw new Error("无法获取 IP 地址");
  }
};

// 调用 proxycheck.io 检测代理或 VPN
const checkIP = async (ip: string): Promise<any> => {
  //   const apiKey = "你的_proxycheck_api_key"; // 替换为你的 API 密钥
  try {
    const response = await fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1`);
    if (response.ok) {
      const data = await response.json();
      return data[ip];
    } else {
      throw new Error("检测代理/VPN 失败");
    }
  } catch (error) {
    console.error(error);
    throw new Error("检测代理/VPN 失败");
  }
};

// 检测代理/VPN功能
const onCheckIP = async () => {
  try {
    // 获取 IP 地址
    const ip = await getCurrentIP();
    console.log("当前 IP 地址:", ip);

    // 检测是否使用代理或 VPN
    const result = await checkIP(ip);
    console.log("检测结果:", result);

    if (result && result.proxy === "yes") {
      // 检测到使用代理或 VPN
      ElMessageBox.alert("检测到您可能正在使用代理或 VPN！", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      });
    } else {
      // 未检测到代理或 VPN
      ElMessage({
        message: "未检测到代理或 VPN",
        type: "success",
      });
    }
  } catch (error) {
    console.error("错误:", error);
    ElMessage({
      message: "检测失败，请稍后重试",
      type: "error",
    });
  }
};
</script>
