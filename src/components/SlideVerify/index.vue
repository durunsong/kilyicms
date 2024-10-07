<template>
  <div class="slide_box1">
    <el-button
      :icon="Close"
      size="small"
      class="slider_close_btn"
      circle
      @click="handleClose"
    ></el-button>
    <div class="slide_inner_box">
      <SlideVerify
        class="slide_box"
        ref="block"
        :slider-text="t('swipe_right')"
        :accuracy="1"
        @again="onAgain"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :imgs="img"
      ></SlideVerify>
      <div class="msg_box" :style="'color:' + fontColor">{{ msg }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SlideVerify, { SlideVerifyInstance } from "vue3-slide-verify"; //引入滑动验证组件
import "vue3-slide-verify/dist/style.css"; //引入滑动验证组件样式
import slideImg_1 from "@/assets/images/slideimg-1.png";
import slideImg_2 from "@/assets/images/slideimg-2.png";
import slideImg_3 from "@/assets/images/slideimg-3.png";
import slideImg_4 from "@/assets/images/slideimg-4.png";
import slideImg_5 from "@/assets/images/slideimg-5.png";
import slideImg_6 from "@/assets/images/slideimg-6.png";
import { Close } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const msg = ref<string>("");
//自定义图片
const img = ref([
  slideImg_1,
  slideImg_2,
  slideImg_3,
  slideImg_4,
  slideImg_5,
  slideImg_6,
]);
const block = ref<SlideVerifyInstance>();
const emit = defineEmits(["again", "success", "fail", "refresh", "close"]);

const fontColor = ref("");

const onAgain = () => {
  msg.value = t("non_human_operation_detected");
  fontColor.value = "red";
  // 刷新
  block.value?.refresh();
};
//成功的回调
const onSuccess = (times: number) => {
  msg.value =
    t("successful_which_takes") + (times / 1000).toFixed(1) + t("seconds");
  fontColor.value = "green";
  emit("success");
};
const handleClose = () => {
  msg.value = "";
  emit("close");
};
//失败的回调
const onFail = () => {
  msg.value = t("Verification_failed");
  fontColor.value = "red";

  setTimeout(() => {
    msg.value = "";
  }, 1000);
};
//点击刷新回调
const onRefresh = () => {
  msg.value = "";
};
</script>
<style scoped>
.slide_box1 {
  background: #fff;
  padding: 10px;
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  height: auto;
  min-height: 240px;
  max-height: 255px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  box-shadow: rgba(192, 196, 204, 0.6) 2px 2px 5px;
}

.slider_close_btn {
  z-index: 100;
  position: absolute;
  right: -10px;
  top: -10px;
}

.slide_inner_box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.msg_box {
  font-size: 14px;
}
</style>
