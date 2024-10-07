<template>
  <div flex h-full uno-padding-5 flex-wrap>
    <el-card shadow="hover">
      <div flex>
        <div class="i-vs-language text-blue-400"></div>
        {{
          t("i18nComponent", {
            "element-plus": "element-plus",
            "vue-i18n": "vue-i18n",
          })
        }}
      </div>
      <LanguageSwitcher></LanguageSwitcher>
    </el-card>
    <el-card shadow="hover">
      <div m-b-2>{{ t("customSwitchComponent") }}</div>
      <PlaneSwitch
        v-model:checked="switchState"
        @update:checked="handleSwitchChange"
      ></PlaneSwitch>
      <div m-t-2>Switch is {{ switchState ? "ON" : "OFF" }}</div>
    </el-card>
    <el-card shadow="hover">
      <p>
        {{ t("iconIntegration", { unocss: "unocss", iconify: "iconify" }) }},
        <a
          flex
          op30
          dark:op60
          hover="op80"
          dark:hover="op80"
          href="https://yesicon.app"
          target="_blank"
        >
          <span class="i-mingcute-link-3-fill"></span>
          {{ t("clickHereForIcons") }}
        </a>
      </p>
      <div
        class="i-whh-mymusic text-blue-400"
        role="img"
        aria-hidden="true"
      ></div>
    </el-card>
    <el-card shadow="hover">
      <p>{{ t("themeSwitch") }}</p>
      <ThemeSwitch cursor-pointer></ThemeSwitch>
    </el-card>
    <el-card shadow="hover">
      <p>{{ t("fullscreenSwitch") }}♐</p>
      <p>{{ t("fullscreenDescription") }}♐</p>
    </el-card>
    <el-card shadow="hover">
      <p>{{ t("codeStandards") }}🐧</p>
      <p>{{ t("codeConventions") }}</p>
    </el-card>
    <el-card shadow="hover">
      <p>{{ t("permissionExample") }}</p>
      <p>
        <router-link
          flex
          op30
          dark:op60
          hover="op80"
          dark:hover="op80"
          to="/permission/page"
        >
          <span class="i-ph-link-bold"></span>
          {{ t("clickHereToExample") }}
        </router-link>
      </p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";

const switchState = ref(true);
const { t } = useI18n();
// 处理子组件发出的开关状态变化事件
const handleSwitchChange = (newState: boolean) => {
  switchState.value = newState;
  console.log("Switch state changed to", newState);
};
</script>

<style scoped>
:deep(.el-card) {
  margin: 5px;
  width: 300px;
  height: 130px;
  display: flex;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
