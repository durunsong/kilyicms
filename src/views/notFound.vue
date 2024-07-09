<template>
  <div class="wrong">
    <h3>404,您走丢了!!!!!</h3>
    <el-image :src="imgs" alt="404" class="img" />
    <el-button @click="goHome">返回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
const imgs = ref(
  "https://pic.baike.soso.com/ugc/baikepic2/15273/20171208185211-623873279_png_545_325_79645.jpg/0"
);
const goHome = () => {
  router.push("/home");
};
</script>

<style lang="scss" scoped>
.wrong {
  display: flex;
  flex-flow: column;
  justify-content: center;
  font-size: 24px;
  align-items: center;
  color: red;
  .img {
    width: 700px;
    height: 400px;
  }
  button {
    width: 120px;
    background-color: skyblue;
    height: 40px;
    margin-top: 20px;
    border-radius: 10px;
    color: red;
    border: 2px solid pink;
    font-size: 18px;
  }
  h3 {
    font-size: 30px;
    color: red;
    margin-top: 30px;
    margin-bottom: 20px;
  }
}
</style>
