/** 统一处理 Cookie */
import CACHE_KEY from "@/constants/cache-key";
import Cookies from "js-cookie";

export const getToken = () => {
  return Cookies.get(CACHE_KEY.TOKEN);
};

export const setToken = (token: string): any => {
  Cookies.set(CACHE_KEY.TOKEN, token);
};

export const removeToken = () => {
  Cookies.remove(CACHE_KEY.TOKEN);
};
