<template>
  <el-header class="header_top">
    <div class="expandFoldAndIsCollapse">
      <component :is="isCollapse ? Expand : Fold" @click="handleClick" class="expandFold"></component>
      <TabBreadcrumb/>
    </div>
    <div class="avatar_dropdown">
      <el-tooltip :effect="tooltipEffect" :content="tooltipContent" placement="bottom">
        <div class="avatar_dropdown_plane_switch">
          <PlaneSwitch />
        </div>
      </el-tooltip>
      <ScreenFull />
      <div class='select_language_popover'>
        <LanguageSwitcher/>
      </div>
      <el-avatar :size="50" class="avatar_img" :src="imageList" @error="errorHandler"></el-avatar>
      <el-dropdown @command="quitOut">
        <span class="el-dropdown-link">
          <span v-if="userInfo">你好: {{ userInfo.loginName }}</span>
          <el-icon class="el-icon--right">
            <ArrowDown />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="a">关于</el-dropdown-item>
            <el-dropdown-item command="q">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ArrowDown, Expand, Fold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { userPomotionStore } from "@/store";
import ScreenFull from "@/components/ScreenFull/index.vue";
import PlaneSwitch from "@/components/PlaneSwitch/index.vue";
import emptyImagePath from "../../assets/images/pkqiou.png";
import TabBreadcrumb from "@/components/TabBreadcrumb/index.vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const store = userPomotionStore();
const darkAndLight = computed(() => store.dark_and_light);
const emptyImage = ref(emptyImagePath);
const tooltipEffect = ref<string>("dark");
const tooltipContent = computed<string>(() => (darkAndLight.value ? t('dark') : t('light')));
const errorHandler = (event: Event) => {
  (event.target as HTMLImageElement).src = emptyImage.value;
};

const router = useRouter();
const userInfo = computed(() => store.userInfo?.userInfo);
const imageList = computed(() => userInfo.value?.avatar || emptyImage.value);
const isCollapse = computed(() => store.isCollapse);

const handleClick = () => {
  store.statusChange();
};

const quitOut = (command: string) => {
  switch (command) {
    case "a":
      ElMessage({
        message: "暂不处理",
        type: "warning",
      });
      break;
    case "q":
      localStorage.removeItem("token");
      store.$reset();
      router.push("/login");
      break;
  }
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
  
  
  .expandFoldAndIsCollapse{
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
    .select_language_popover{
      display: flex;
      align-items: center;
      margin-right: 10px
    }
  }
}

.el-dropdown-link {
  outline: none;

  &:hover {
    outline: none;
  }
}
</style>
