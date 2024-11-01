<template>
  <el-tour v-model="open" :show-close="false" @change="handleChange">
    <el-tour-step
      v-for="(item, index) in props.data"
      :key="index"
      :target="item.target"
      :title="item.title ? item.title : `第${currentStep + 1}步`"
      :description="item.description"
      :prev-button-props="{
        children: '上一步',
        onClick: handlePrevClick,
      }"
      :next-button-props="{
        children: nextBtnName,
        onClick: handleNextClick,
      }"
      :placement="item.placement"
    ></el-tour-step>
    <template #indicators>
      <el-button size="small" @click="handleSkip">跳过</el-button>
    </template>
  </el-tour>
</template>

<script lang="ts" setup>
import { ref, computed, type Ref, type ComputedRef } from "vue";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData, setLocalData } from "@/utils/cache/local-storage";

const props = defineProps(["data"]);
const emits = defineEmits([
  "change",
  "prev",
  "next",
  "skip",
  "update:modelValue",
]);

// 当前步数，从0开始，由于第0步是开始语，后面的步数可以正好对应
const currentStep: Ref<number> = ref(0);

// 获取是否开启引导----本地缓存数据
const IS_SHOW_Tour_Visible: any = getLocalData(CACHE_KEY.IS_SHOW_Tour_Visible);

// 引导组件开启状态，根据本地缓存值动态设置初始值
const open: Ref<boolean> = ref(IS_SHOW_Tour_Visible !== false) || false;

// 动态修改下一步按钮名称
const nextBtnName: ComputedRef<string> = computed(() => {
  let name = "";
  if (currentStep.value === 0) {
    name = "开始";
  } else if (currentStep.value === props.data.length - 1) {
    name = "完成";
  } else {
    name = `下一步（${currentStep.value + 1} / ${props.data.length}）`;
  }
  return name;
});

// 步数切换时触发
const handleChange = (step: number) => {
  if (step !== currentStep.value) {
    currentStep.value = step;
    emits("change", step);
  }
};

// 点击跳过按钮时触发
const handleSkip = () => {
  currentStep.value = 0;
  open.value = false;
  emits("update:modelValue", false); // 更新绑定值，确保关闭
  emits("skip");
  setLocalData(CACHE_KEY.IS_SHOW_Tour_Visible, false); // 更新本地缓存
};

// 点击上一步按钮时触发
const handlePrevClick = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
    emits("prev", currentStep.value);
  }
};

// 点击下一步按钮时触发
const handleNextClick = () => {
  if (currentStep.value < props.data.length - 1) {
    currentStep.value += 1;
    emits("next", currentStep.value);
  } else {
    handleSkip(); // 如果是最后一步，触发跳过逻辑
  }
};
</script>
