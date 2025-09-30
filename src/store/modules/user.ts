import { ref } from "vue";
import store from "@/store";
import { defineStore } from "pinia";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { getToken, removeToken, setToken } from "@/utils/cache/cookies";
import { resetRouter } from "@/router";
import CACHE_KEY from "@/constants/cache-key";
import { setLocalData, getLocalData, removeLocalData } from "@/utils/cache/local-storage";
import { loginApi, userInfoApi } from "@/service/login";
import { ElNotification } from "element-plus";
import { useGreeting } from "@/hooks/useGreeting";
import routeSettings from "@/config/route";
import { LoginRequestData } from "@/types/store.user";
import i18n from "@/i18n";
const { t } = i18n.global;

export const useUserStore: any = defineStore("user", () => {
  const is_login = getLocalData(CACHE_KEY.IS_LOGIN_KEY) ?? false;
  const is_show_login_notice = getLocalData(CACHE_KEY.IS_SHOW_NOTICE) ?? false;
  const is_show_login_notice_tips = getLocalData(CACHE_KEY.IS_SHOW_NOTICE_TIPS) ?? false;
  const token = ref<string>(getToken() || "");
  const roles = ref<string[]>([]);
  const user_name = ref<string>("");
  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();
  /** 登录 */
  const login = async ({ user_name, password }: LoginRequestData) => {
    const res: any = await loginApi({ user_name, password });
    // 判断登录结果
    if (res.status === 200) {
      setToken(res.token);
      // 登录成功notify标记
      setLocalData(CACHE_KEY.IS_LOGIN_KEY, true);
    } else {
      showNotification(res.message, "warning");
      return; // 如果登录失败，终止后续操作
    }
    token.value = res.token;
  };

  /** 获取用户角色详情 */
  const getInfoRoles = async () => {
    // 登录问候语
    const { showGreetingNotification } = useGreeting(t);
    // 获取用户信息
    const res: any = await userInfoApi();
    setLocalData(CACHE_KEY.USER_INFO, res.userInfo);
    // 显示问候语
    if (!is_login && !is_show_login_notice) {
      showGreetingNotification(t("login_success"), res.userInfo.user_name);
    } else if (is_login && is_show_login_notice) {
      showGreetingNotification(t("switch_roles_Successfully"), res.userInfo.user_name);
      if (is_show_login_notice_tips) {
        setLocalData(CACHE_KEY.IS_SHOW_NOTICE, false);
      }
    }
    // 这里模拟获取用户信息，具体逻辑看前后端约束
    user_name.value = res.userInfo.user_name;
    // 验证返回的 roles 是否为一个非空数组，否则塞入一个没有任何作用的默认角色，防止路由守卫逻辑进入无限循环
    roles.value = res.userInfo.roles?.length > 0 ? res.userInfo.roles : routeSettings.defaultRoles;
  };

  /** 模拟角色变化 */
  const changeRoles = async (role: string) => {
    try {
      // 这里user_name和password具体是什么，需要看后端SQL设计和接口约束，这里只是个示例
      const newRole = role == "admin" ? "admin" : "user";
      const params = {
        user_name: newRole,
        password: "123456"
      };
      // 登录API调用
      const res: any = await loginApi(params);
      // 判断登录结果
      if (res.status === 200) {
        setToken(res.token);
        // 切换角色notification
        setLocalData(CACHE_KEY.IS_SHOW_NOTICE, true);
        setLocalData(CACHE_KEY.IS_SHOW_NOTICE_TIPS, true);
      } else {
        showNotification(res.message, "warning");
        return;
      }
      // 刷新页面（可根据需求选择是否必要） ---- 免登录刷新页面
      window.location.reload();
    } catch (error: Error | any) {
      showNotification(error, "error");
    }
  };

  // 通知弹窗函数
  const showNotification = (message: string, type: "success" | "warning" | "error") => {
    ElNotification({
      message,
      type
    });
  };

  /** 登出 */
  const logout = () => {
    removeToken();
    removeLocalData(CACHE_KEY.USER_INFO);
    setLocalData(CACHE_KEY.IS_SHOW_NOTICE, false);
    setLocalData(CACHE_KEY.IS_LOGIN_KEY, false);
    removeLocalData(CACHE_KEY.IS_SHOW_NOTICE_TIPS);
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
    user_name,
    login,
    getInfoRoles,
    changeRoles,
    logout,
    resetToken
  };
});

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store);
}
