<template>
  <div class="wrong">
    <div class="not_found">
      <el-image :src="imgs" alt="404" class="img" />
    </div>
    <div class="btn_back">
      <div class="btn_back_in">
        <el-button @click="goHome" class="btn">goHome</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { userPomotionStore } from "@/store";

const store = userPomotionStore();
const tuiguangURL = store.tuiguangURL;
const imgs = ref(tuiguangURL + "/common/404.png");
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

    .img {
      width: 700px;
      height: 580px;
    }
  }

  .btn_back {
    display: flex;
    align-items: center;
    justify-content: center;

    .btn_back_in {
      display: flex;
      align-items: center;

      .btn {
        width: 120px;
        background-color: #64fcd9;
        height: 40px;
        margin-top: 20px;
        border-radius: 10px;
        color: #f15b41;
        font-size: 18px;
      }
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

      .img {
        width: 350px;
        height: 290px;
      }
    }

    .btn_back {
      display: flex;
      align-items: center;
      justify-content: center;

      .btn_back_in {
        display: flex;
        align-items: center;

        .btn {
          width: 120px;
          background-color: #64fcd9;
          height: 40px;
          margin-top: 20px;
          border-radius: 10px;
          color: #f15b41;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
