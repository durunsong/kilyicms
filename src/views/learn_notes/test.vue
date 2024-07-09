<template>
  <div class="son">
    <h1>我是子组件:</h1>
    <p>{{ msg }}</p>
    <p>{{ num }}</p>
    <button @click="changerrr">page{{ page }}</button>
    <button>size{{ size }}</button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["page", "size", "msg", "num"]);
console.log("123456543111111---", props.msg, props.num);
// props 是一个 proxy代理对象
console.log("123456543---", props);

let $emit = defineEmits(["update:page"]);

// let emit = defineEmits(["changeee"]);
const changerrr = () => {
  $emit("update:page", props.page + 2);
};

// 子组件向父组件传递数据
// const emitChange = (value: string) => {
//   emit("changeee", value);
// };
</script>

<style lang="scss" scoped>
.son {
  height: 200px;
  width: 400px;
  background-color: #f00;
}
</style>
