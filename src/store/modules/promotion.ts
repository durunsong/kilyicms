import { defineStore } from "pinia";
import type {
  MetaInfo,
  UserPromotionStateKeys,
  UserPromotionStateGetters,
} from "@/types/store";
import { ref, computed } from "vue";

export const userPomotionStore = defineStore("promotion", () => {
  // State
  const is_screen_full = ref(false);
  const userInfo = ref({});
  const metaInfo = ref<MetaInfo>({
    title: "",
    keywords: "",
    description: "",
  });
  const affcode = ref("");
  const kilyimallLoginURL = ref("https://www.kilyimall.com/login");
  const tuiguangURL = ref("https://cfstatic.hagoby.com/tg");
  const kilyimall = ref("https://www.kilyimall.com");
  const kilyimallURL = ref("https://www.kilyimall.com/register");
  const kilyimallURLforwarding = ref("https://www.kilyimall.com/forwarding");
  const imageUrl = ref("https://cfstatic.hagoby.com/www/pic");
  const m_kilyimallLoginURL = ref("https://www.kilyimall.com/login");
  const m_kilyimallURL = ref("https://www.kilyimall.com/register");
  const m_kilyimall = ref("https://www.kilyimall.com");

  // Getters
  const dynamicURLKeys = (property: UserPromotionStateKeys) => {
    return computed(() => {
      const state: UserPromotionStateGetters = {
        is_screen_full,
        kilyimallLoginURL,
        tuiguangURL,
        kilyimall,
        kilyimallURL,
        kilyimallURLforwarding,
        imageUrl,
        m_kilyimallLoginURL,
        m_kilyimallURL,
        m_kilyimall,
      };
      if (affcode.value !== "") {
        return `${state[property].value}?${affcode.value}`;
      } else {
        return state[property].value || "";
      }
    });
  };
  const dynamicAffcode = computed(() => {
    return affcode.value !== "" ? `&${affcode.value}` : "";
  });

  // Actions
  const setUserInfo = (data: any) => {
    userInfo.value = data;
  };

  const setMetaInfo = (info: MetaInfo) => {
    metaInfo.value = info;
  };

  const setState = (payload: { [key: string]: any }) => {
    Object.keys(payload).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        (userPomotionStore as any)[key].value = payload[key];
      }
    });
  };

  // Persistence
  const persist = {
    storage: localStorage,
    paths: ["userInfo"],
  };

  return {
    is_screen_full,
    userInfo,
    metaInfo,
    affcode,
    kilyimallLoginURL,
    tuiguangURL,
    kilyimall,
    kilyimallURL,
    kilyimallURLforwarding,
    imageUrl,
    m_kilyimallLoginURL,
    m_kilyimallURL,
    m_kilyimall,
    dynamicURLKeys,
    dynamicAffcode,
    setUserInfo,
    setMetaInfo,
    setState,
    persist,
  };
});
