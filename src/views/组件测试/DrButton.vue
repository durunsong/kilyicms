<template>
  <div :title="title">
    <!-- $attrs 相当于传递了三个属性 -->
    <el-button :="$attrs" />
  </div>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";
// useAttrs方法获取组件标签上的属性和事件
let $attrs = useAttrs();
console.log($attrs);
let props = defineProps(["title"]);
console.log("888", props.title);
// props与useAttrs方法都可以获取父组件传递过来的属性和属性值
// 但是props接受了之后,useAttrs方法就获取不到了
</script>

<style scoped></style>
