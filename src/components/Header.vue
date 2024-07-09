<template>
  <el-header class="top">
    <component v-if="isCollapse == true" :is="Expand" @click="handleClick" class="expandFold"></component>
    <component v-else :is="Fold" @click="handleClick" class="expandFold"></component>
    <div class="avatar_dropdown">
      <el-avatar :size="50" class="avatar_img" :src="imageList" @error="errorHandler"></el-avatar>
      <el-dropdown @command="quitOut">
        <span class="el-dropdown-link">
          <span v-if="userInfo && userInfo !== null">你好: {{ userInfo?.userInfo?.loginName }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
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
const emptyImage = ref(require('@/assets/images/pkqiou.png'));

const errorHandler = (event:any) => {
  event.target.src = emptyImage.value;
};
const router = useRouter();
const store = userPomotionStore();
const userInfo = computed(() => store.userInfo);
const imageList = computed(() => userInfo.value?.userInfo?.avatar);

const isCollapse = computed(() => store.isCollapse);
const handleClick = () => {
  store.statusChange();
};

const quitOut = (str: any) => {
  switch (str) {
    case "a":
      ElMessage({
        message: "暂不处理",
        type: "warning",
      });
      break;
    case "q":
      localStorage.removeItem("token");
      store.$state.userInfo = {};
      router.push("/login");
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
.top {
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  text-align: right;
  font-size: 14px;
  height: 100px;
  width: 100%;
  background-color: #d2cbcb;

  .expandFold {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }

  .avatar_dropdown {
    display: flex;

    .avatar_img {
      margin-top: -10px;
      margin-right: 10px;
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
