// 读取url键值对hooks
import { userPomotionStore } from "@/store";

export const useAffcode = () => {
    const url = window.location.href;
    const store = userPomotionStore();
    const searchParams = new URLSearchParams(new URL(url).search);
    const affcodeValue = searchParams.get("affcode");
    store.affcode = affcodeValue !== null ? "affcode=" + affcodeValue : '';      
};
