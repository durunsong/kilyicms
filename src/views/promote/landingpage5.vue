<template>
    <div>
      <div id="info">
        <p>纯前端实现的浏览器指纹采集器，通过获取浏览器中所有能获取到的信息(部分通过base64转成String)，最后生成出md5，用于该用户在该设备上的唯一标识码，官方宣称准确度高达99.5%</p>
      </div>
      <div id="control">
        <button @click="start">开始</button>
        <span>userAgent:</span><input type="checkbox" v-model="userAgent">
        <span>fonts:</span><input type="checkbox" v-model="fonts">
        <span>fontsFlash:</span><input type="checkbox" v-model="fontsFlash">
        <span>canvas:</span><input type="checkbox" v-model="canvas">
        <span>webgl:</span><input type="checkbox" v-model="webgl">
        <span>audio:</span><input type="checkbox" v-model="audio">
        <span>enumerateDevices:</span><input type="checkbox" v-model="enumerateDevices">
      </div>
      <div v-html="view"></div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Fingerprint2 from 'fingerprintjs2';
  
  const userAgent = ref(true);
  const fonts = ref(true);
  const fontsFlash = ref(true);
  const canvas = ref(true);
  const webgl = ref(true);
  const audio = ref(true);
  const enumerateDevices = ref(true);
  const view = ref('');
  
  const start = () => {
    const startTime = new Date().getTime();
    view.value = '';
    let excludes = {};
    if (!userAgent.value) excludes.userAgent = true;
    if (!audio.value) excludes.audio = true;
    if (!enumerateDevices.value) excludes.enumerateDevices = true;
    if (!fonts.value) excludes.fonts = true;
    if (!fontsFlash.value) excludes.fontsFlash = true;
    if (!webgl.value) excludes.webgl = true;
    if (!canvas.value) excludes.canvas = true;
  
    let options = { excludes: excludes };
  
    Fingerprint2.get(options, function (components) {
      const values = components.map(function (component) {
        return component.value;
      });
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      view.value += `<p>指纹 : ${murmur}</p>`;
      view.value += `<p>消耗 : ${(new Date().getTime() - startTime)} 毫秒</p>`;
      view.value += `<p>使用的参数 : </p>`;
      for (const c of components) {
        view.value += `<p>${c.key} : ${c.value}</p>`;
      }
    });
  };
  </script>
  
  <style>
  body {
    color: #555;
  }
  
  #info {
    font-size: 12px;
  }
  
  #control span {
    color: #333;
    margin-left: 10px;
  }
  </style>
  