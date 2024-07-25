<template>
  <div class="wrong">
    <div class="not_found">
      <el-image @click="goHome" :src="imgs" alt="404" class="not_found_img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
const imgs = ref(
  "https://img.zcool.cn/community/01c2ea586c65a2a8012060c86b5bf8.png@1280w_1l_2o_100sh.png"
);
const goHome = () => {
  router.push("/");
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

  .not_found {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    .not_found_img {
      width: 1000px;
      height: 580px;
    }
  }
}

@media screen and (max-width: 991px) {
  .wrong {
    display: flex;
    flex-flow: column;
    justify-content: center;
    font-size: 24px;
    align-items: center;
    color: red;

    .not_found {
      display: flex;
      justify-content: center;
      margin-top: 120px;

      .not_found_img {
        width: 450px;
        height: 260px;
      }
    }
  }
}
</style>
