<template>
  <div>
    主页<br /><br />
    全局组件:
    <Pagination /><br />
    开关组件:
    <PlaneSwitch /><br/>
    语言切换组件:
    <LanguageSwitcher />

  </div>
</template>

<script setup lang="ts">
import PlaneSwitch from "@/components/PlaneSwitch/index.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";

</script>
