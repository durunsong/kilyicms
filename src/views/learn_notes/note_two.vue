<template>
  <div class="box">

    <h1>props:我是父组件</h1>
    <!-- v-model -->
    <!-- 
      v-model 语法糖
      相当于给子组件传递了两个值page和size
      子组件通过emit触发事件，把page和size传递给父组件
     -->
    <Test v-model:page="page" v-model:size="size" @changeee="rrrr" msg="12345678765434567实打实吃饭v方便vGV份额从v" :num="num">
    </Test>
    <hr />
    <h3>{{ page }}</h3>
    <!-- 组件的嵌套 -->
  </div>
</template>

<script setup lang="ts">
import Test from "./test.vue";
import { ref } from "vue";
let num = ref(100);
let page = ref(999);
let size = ref(888);
const rrrr = () => {
  num.value++;
};
const hhhh = () => { };
</script>
<style scoped>
.box {
  width: 100%;
  height: 300px;
  background-color: aqua;
}
</style>
