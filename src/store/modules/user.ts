import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import { resetRouter } from "@/router";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData, setLocalData } from "@/utils/cache/local-storage";
// import { loginApi } from "@/service/login";
// import {  getUserInfoApi } from "@/service/login";
// import { type LoginRequestData } from "@/service/login/types/login";
// export interface LoginRequestData {
//   /** admin 或 user */
//   username: "admin" | "user";
//   /** 密码 */
//   password: string;
//   /** 验证码 */
//   code: string;
// }
import routeSettings from "@/config/route";

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const username = ref<string>("");

  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();

  // 先存储本地模拟权限
  const adminRoles = getLocalData(CACHE_KEY.TOKEN_ROLE);

  /** 登录 */
  const login = async () => {
    // const login = async ({ username, password, code }: LoginRequestData) => {
    // const { data } = await loginApi({ username, password, code });
    let __data;
    if (!adminRoles) {
      __data = {
        token: "token-admin",
      };
    } else if (adminRoles && adminRoles == "token-admin") {
      __data = {
        token: "token-admin",
      };
    } else {
      __data = {
        token: "token-user",
      };
    }
    setToken(__data.token);
    token.value = __data.token;
  };
  /** 获取用户详情 */
  const getInfo = async () => {
    // const { data } = await getUserInfoApi()
    let __data;
    if (!adminRoles) {
      __data = {
        username: "admin",
        roles: ["admin"],
      };
    } else if (adminRoles && adminRoles == "token-admin") {
      __data = {
        username: "admin",
        roles: ["admin"],
      };
    } else {
      __data = {
        username: "user",
        roles: ["user"],
      };
    }
    username.value = __data.username;
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value =
      __data.roles?.length > 0 ? __data.roles : routeSettings.defaultRoles;
  };
  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    // 先存储本地模拟权限切换
    const roleAdmin = "token-" + role;
    setLocalData(CACHE_KEY.TOKEN_ROLE, roleAdmin);

    const newToken = "token-" + role;
    token.value = newToken;
    setToken(newToken);
    // 用刷新页面代替重新登录
    window.location.reload();
  };
  /** 登出 */
  const logout = () => {
    removeToken();
    token.value = "";
    roles.value = [];
    resetRouter();
    _resetTagsView();
  };
  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
    roles.value = [];
  };
  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews();
      tagsViewStore.delAllCachedViews();
    }
  };

  return {
    token,
    roles,
    username,
    login,
    getInfo,
    changeRoles,
    logout,
    resetToken,
  };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}
