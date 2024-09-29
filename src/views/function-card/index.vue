<template>
  <div flex flex-col h-full uno-padding-5 flex-wrap>
    <el-card class="w-[400px]" shadow="hover">
      <p>自定义开关组件</p>
      <PlaneSwitch
        v-model:checked="switchState"
        @update:checked="handleSwitchChange"
      ></PlaneSwitch>
      <p>Switch is {{ switchState ? "ON" : "OFF" }}</p>
    </el-card>
    <el-card class="w-[400px]" shadow="hover">
      <p>
        unocss集成标签图标iconify,
        <a
          flex
          op30
          dark:op60
          hover="op80"
          dark:hover="op80"
          href="https://yesicon.app"
          target="_blank"
        >
          <span class="i-material-symbols-link-rounded"></span>
          点击此处找图标
        </a>
      </p>
      <div
        class="i-whh-mymusic text-blue-400"
        role="img"
        aria-hidden="true"
      ></div>
    </el-card>
    <el-card class="w-[400px]" shadow="hover">
      <div flex>
        <div class="i-vs-language text-blue-400"></div>
        国际化组件:16种语言切换,element-plus组件内置和vue-i18n语言切换同步
      </div>
      <LanguageSwitcher></LanguageSwitcher>
    </el-card>
    <el-card class="w-[400px]" shadow="hover">
      <p>常规三种主题色切换(不包括灰色和色弱模式)</p>
      <ThemeSwitch cursor-pointer></ThemeSwitch>
    </el-card>
    <el-card class="w-[400px]" shadow="hover">
      <p>两种全屏模式(菜单区和内容区)♐</p>
      <p>屏幕右上角和内容区右上角♐</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";

const switchState = ref(true);
// const { t } = useI18n();
// 处理子组件发出的开关状态变化事件
const handleSwitchChange = (newState: boolean) => {
  switchState.value = newState;
  console.log("Switch state changed to", newState);
};
</script>

<style scoped>
:deep(.el-card) {
  margin: 8px;
}
</style>
