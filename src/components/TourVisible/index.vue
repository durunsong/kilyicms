<template>
  <el-tour v-model="open" :show-close="false" @change="handleChange">
    <el-tour-step
      v-for="(item, index) in props.data"
      :key="index"
      :target="item.target"
      :title="item.title ? item.title : t('tour_step', { currentStep: currentStep + 1 })"
      :description="item.description"
      :prev-button-props="{
        children: t('tour_prev'),
        onClick: handlePrevClick
      }"
      :next-button-props="{
        children: nextBtnName,
        onClick: handleNextClick
      }"
      :placement="item.placement"
    ></el-tour-step>
    <template #indicators>
      <el-button size="small" @click="handleSkip">{{ t("tour_skip") }}</el-button>
    </template>
  </el-tour>
</template>

<script lang="ts" setup>
import { ref, computed, type Ref, type ComputedRef } from "vue";
import CACHE_KEY from "@/constants/cache-key";
import { setLocalData } from "@/utils/cache/local-storage";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps(["data"]);
const emits = defineEmits(["change", "prev", "next", "skip", "update:modelValue"]);

// 当前步数，从0开始，由于第0步是开始语，后面的步数可以正好对应
const currentStep: Ref<number> = ref(0);

// 引导组件开启状态
const open: Ref<boolean> = ref(false);

// 动态修改下一步按钮名称
const nextBtnName: ComputedRef<string> = computed(() => {
  let name = "";
  if (currentStep.value === 0) {
    name = t("tour_start");
  } else if (currentStep.value === props.data.length - 1) {
    name = t("tour_complete");
  } else {
    name = t("tour_nextStep", {
      currentStep: currentStep.value + 1,
      totalSteps: props.data.length
    });
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
  setLocalData(CACHE_KEY.IS_SHOW_Tour_Visible, true); // 更新本地缓存
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
