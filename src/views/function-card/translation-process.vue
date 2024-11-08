<template>
  <div class="iframe-container">
    <iframe
      :src="url"
      frameborder="0"
      class="iframe"
      title="Embedded Page"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const url = ref("https://translation-tools.vercel.app/");
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh;
}

.iframe {
  width: 100%;
  height: 100%;
  min-height: 500px;
}
</style>
