<template>
    <el-container class="common_layout">
      <el-aside width="auto">
        <el-menu :default-active="$route.path" :router="true" :collapse="isCollapse">
          <el-menu-item index="/home">
            <el-icon>
              <House />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu v-for="item in visibleList.filter(val => !val.meta.hidden)" :key="item.path"
            :index="`/home/${item.path}`">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon" />
              </el-icon><span>{{ item.label }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="subitem in item.children.filter(subVal => !subVal.meta.hidden)" :key="subitem.path"
                :index="`/home/${item.path}/${subitem.path}`">
                <span>
                  <el-icon>
                    <component :is="subitem.meta.icon" />
                  </el-icon>
                  {{ subitem.label }}
                </span>
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container class="right_container">
        <div>
          <Header></Header>
        </div>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>
  <script setup lang="ts">
  import Header from "@/components/Header/index.vue";
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
  let visibleList = computed(() => {
    return JSON.parse(JSON.stringify(routes[2].children));
  });
  </script>
  
  <style lang="scss" scoped>
  .header {
    height: 120px;
    background-color: #b9b3b3;
  }
  
  .common_layout {
    width: 100vw;
    height: 100vh;
    background: #eee;
    display: flex;
  
    .right_container {
      display: flex;
      flex-flow: column;
    }
  }
  
  .el-aside {
    background-color: #e5e5e5;
    height: 100vh;
  }
  
  .el-menu {
    border: none;
    height: 100vh;
  }
  
  :deep(.el-aside) {
    overflow-y: scroll;
  
    &::-webkit-scrollbar {
      display: none;
    }
  }
  </style>
  