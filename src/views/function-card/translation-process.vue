<template>
  <div class="w-full h-screen">
    <iframe
      :src="url"
      frameborder="0"
      class="w-full h-full min-h-[500px]"
      title="Embedded Page"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const url = ref("https://translation-tools.vercel.app/");
</script>
