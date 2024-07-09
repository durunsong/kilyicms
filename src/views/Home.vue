<template>
  <el-container class="common_layout">
    <el-aside width="auto">
      <el-menu router :collapse="isCollapse">
        <el-menu-item index="/home">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu v-for="item in list" :index="`/home/${item.path}`">
          <template #title>
            <el-icon> <Location /> </el-icon><span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="subitem in item.children"
              :index="`/home/${item.path}/${subitem.path}`"
            >
              <span>
                <el-icon><Setting /></el-icon>
                {{ subitem.label }}
              </span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container class="right_container">
      <div>
        <Heade></Heade>
      </div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import Heade from "@/components/Header.vue";
import { Location, House, Setting } from "@element-plus/icons-vue";
import { routes } from "@/router";
import { ref, computed, onMounted } from "vue";
import { userPomotionStore } from "@/store";
const store: any = userPomotionStore();
onMounted(() => {
  console.log("routes===", routes);
});
const isCollapse = computed(() => {
  return store.$state.isCollapse;
});
let list = computed(() => {
  return JSON.parse(JSON.stringify(routes[2].children));
});
// console.log("8889wuedfewhfdiuhdc", store.userInfo);
// console.log("12345654323456543", store.$state.userInfo);
</script>

<style lang="scss" scoped>
.header {
  height: 120px;
  background-color: #b9b3b3;
}
.common_layout {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  .right_container {
    display: flex;
    flex-flow: column;
  }
}
.el-container {
  height: 100% !important;
}
.el-aside {
  background-color: #e5e5e5;
  height: 100%;
}

.el-menu {
  border: none;
}
:deep(.el-aside) {
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
