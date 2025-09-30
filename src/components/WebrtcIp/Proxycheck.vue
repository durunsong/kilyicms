<template>
  <div>
    <h2 class="text-lg font-bold mb-4">{{ $t("vpnCheckTitle") }}</h2>
    <div v-if="error" class="text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else-if="result" class="space-y-2">
      <p>
        <strong>{{ $t("ipifyCurrentIP") }}</strong> {{ ip }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckRange") }}</strong> {{ result.range }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckProxy") }}</strong> {{ result.proxy }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckType") }}</strong> {{ result.type }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckProvider") }}</strong> {{ result.provider }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckCountry") }}</strong> {{ result.country }} ({{ result.isocode }})
      </p>
      <p>
        <strong>{{ $t("proxyCheckCity") }}</strong> {{ result.city }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckTimezone") }}</strong> {{ result.timezone }}
      </p>
      <p>
        <strong>{{ $t("proxyCheckCoordinates") }}</strong>
        {{ result.latitude }}, {{ result.longitude }}
      </p>
    </div>
    <div v-else>
      <p>{{ $t("dataLoading") }}</p>
    </div>
    <p :class="comparisonResultClass">{{ comparisonResult.message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { onMounted, ref, computed } from "vue";
import { getProxycheck } from "@/service/ip-detection";

const { t } = useI18n();

const ip = ref<string | null>(null);
const result = ref<any | null>(null);
const error = ref<string | null>(null);

const comparisonResult = ref<{ key: string; message: string }>({
  key: "",
  message: ""
});

const comparisonResultClass = computed(() =>
  comparisonResult.value.key === "MATCH" ? "text-sky-500 font-bold text-xl" : "text-red-500 font-bold text-xl"
);

// 获取当前 IP 地址
const getCurrentIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api64.ipify.org?format=json");
    if (response.ok) {
      const data = await response.json();
      return data.ip;
    } else {
      throw new Error(t("ipFetchError"));
    }
  } catch (error) {
    console.error(error);
    throw new Error(t("ipFetchError"));
  }
};

// 调用 proxycheck.io 检测代理或 VPN
const checkIP = async (ip: string): Promise<any> => {
  try {
    const response = await getProxycheck(ip);
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(t("proxyCheckStatusError"));
    }
  } catch (error) {
    console.error(error);
    throw new Error(t("proxyCheckError"));
  }
};

// 页面加载时执行检测逻辑
onMounted(async () => {
  try {
    ip.value = await getCurrentIP();
    const detectionResult = await checkIP(ip.value);
    result.value = detectionResult;

    if (detectionResult.proxy === "no") {
      comparisonResult.value = {
        key: "MATCH",
        message: "🟢" + t("comparisonMatch_ss", { service: "proxycheck.io" }) + "✅"
      };
    } else {
      comparisonResult.value = {
        key: "MISMATCH",
        message: "🔴" + t("comparisonMismatch_ss", { service: "proxycheck.io" }) + "❌"
      };
    }
  } catch (err: any) {
    console.error(t("errorOccurred"), err.message);
    error.value = err.message || t("genericError");
  }
});
</script>
