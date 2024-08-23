<template>
  <el-header class="header_top">
    <div class="expandFoldAndIsCollapse">
      <component :is="isCollapse ? Expand : Fold" @click="handleClick" class="expandFold"></component>
      <TabBreadcrumb />
    </div>
    <div class="avatar_dropdown">
      <el-tooltip :effect="tooltipEffect" :content="tooltipContent" placement="bottom">
        <div class="avatar_dropdown_plane_switch">
          <PlaneSwitch />
        </div>
      </el-tooltip>
      <el-tooltip :effect="tooltipEffectFull" :content="tooltipContentFull" placement="bottom">
        <ScreenFull />
      </el-tooltip>
      <div class='select_language_popover'>
        <LanguageSwitcher />
      </div>
      <el-avatar :size="50" class="avatar_img" :src="imageList" @error="errorHandler"></el-avatar>
      <MyProfile />
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { Expand, Fold } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { userPomotionStore } from "@/store";
import ScreenFull from "@/components/ScreenFull/index.vue";
import PlaneSwitch from "@/components/PlaneSwitch/index.vue";
import emptyImagePath from "../../assets/images/pkqiou.png";
import TabBreadcrumb from "@/components/TabBreadcrumb/index.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import MyProfile from "@/components/MyProfile/index.vue";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

const store = userPomotionStore();
const darkAndLight = computed(() => store.dark_and_light);
const emptyImage = ref(emptyImagePath);
const tooltipEffect = ref<string>("dark");
const tooltipContent = computed<string>(() => (darkAndLight.value ? t('dark') : t('light')));
const tooltipEffectFull = ref<string>("dark");
const tooltipContentFull = computed<string>(() => (store.is_screen_full ? t('Exit_full_screen') : t('Enter_full_screen')));
const errorHandler = (event: Event) => {
  (event.target as HTMLImageElement).src = emptyImage.value;
};

const imageList = computed(() => store.userInfo.avatar);
const isCollapse = computed(() => store.isCollapse);

const handleClick = () => {
  store.statusChange();
};
</script>

<style lang="scss" scoped>
.avatar_dropdown_plane_switch {
  margin-right: 10px;
}

.header_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  text-align: right;
  font-size: 14px;
  height: 100px;
  width: 100%;
  background-color: #d2cbcb;

  .expandFoldAndIsCollapse {
    display: flex;
    align-items: center;

    .expandFold {
      width: 30px;
      height: 30px;
      cursor: pointer;
      margin-right: 20px
    }
  }

  .avatar_dropdown {
    display: flex;
    align-items: center;

    .avatar_img {
      margin-top: -10px;
      margin-right: 10px;
    }

    .select_language_popover {
      display: flex;
      align-items: center;
      margin-right: 10px
    }
  }
}
</style>
