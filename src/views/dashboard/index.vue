<template>
  <div>
    <component :is="isAdmin ? Admin : Editor"></component>
    <!-- 引导组件 -->
    <TourVisible
      v-if="!isMobile && !IS_SHOW_Tour_Visible"
      v-model="open"
      :data="elTourDataOptions"
    ></TourVisible>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user";
import Admin from "./components/Admin.vue";
import Editor from "./components/User.vue";
import TourVisible from "@/components/TourVisible/index.vue";
import { elTourDataOptions } from "@/utils/elTourDataOptions";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getLocalData } from "@/utils/cache/local-storage";
import CACHE_KEY from "@/constants/cache-key";

// 获取是否开启引导----本地缓存数据
const IS_SHOW_Tour_Visible: any = getLocalData(CACHE_KEY.IS_SHOW_Tour_Visible);

const isMobile = useIsMobile();
// 声明操作指引开启状态（为了演示方便，默认开启）
const open = defineModel({
  default: true,
});
const userStore = useUserStore();
const isAdmin = userStore.roles.includes("admin");
</script>
