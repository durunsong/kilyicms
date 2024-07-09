<template>
  <div id="app"></div>
</template>

<script>
import Fingerprint2 from "fingerprintjs2"; // 引入fingerprintjs2
import instance from "@/views/fp演示/request"; // 引入axios实例

export default {
  name: "App",
  components: {},
  data() {
    return {
      datas: {
        versionCode: "183",
        from: "1201",
        fp: "cb18635d4aeb596d32dddaee748ea7b2",
        referer: "",
        uuid: "a16dd790-2216-11ef-9759-bbe0975aecba",
        cur: "USD",
      },
    };
  },
  async created() {
    // 您不应在页面加载时或加载后直接运行指纹。 而是使用setTimeout或requestIdleCallback将其延迟几毫秒，以确保指纹一致。
    if (window.requestIdleCallback) {
      requestIdleCallback(() => {
        this.createFingerprint();
      });
    } else {
      setTimeout(() => {
        this.createFingerprint();
      }, 500);
    }

    console.log("74444444444445+++++++++", instance.value, document.referrer);
  },
  methods: {
    // 创建浏览器指纹
    createFingerprint() {
      // 选择哪些信息作为浏览器指纹生成的依据
      const options = {
        fonts: {
          extendedJsFonts: true,
        },
        excludes: {
          audio: true,
          userAgent: true,
          enumerateDevices: true,
          touchSupport: true,
        },
      };
      // 浏览器指纹
      const fingerprint = Fingerprint2.get(options, (components) => {
        // 参数只有回调函数或者options为{}时，默认浏览器指纹依据所有配置信息进行生成
        const values = components.map((component) => component.value); // 配置的值的数组
        const murmur = Fingerprint2.x64hash128(values.join(""), 31); // 生成浏览器指纹
        console.log(components);
        console.log(values);
        console.log(murmur);
        localStorage.setItem("browserId", murmur); // 存储浏览器指纹，在项目中用于校验用户身份和埋点
      });
    },
  },
};
</script>

<style lang="less"></style>
