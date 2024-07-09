// 处理时间戳转换hooks

import { ref } from "vue";
export function useFormateDate(timestamp: number) {
  const formattedTime = ref("");
  const convertTimestamp = () => {
    const date = new Date(timestamp * 1000); // 将秒数转换为毫秒数
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    formattedTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // 在组件加载时执行一次时间转换
  convertTimestamp();

  return formattedTime.value;
}

/**
 *  <li v-for="item in testList" :key="item.id">
        {{ useFormateDate(item.createtime) }}
    </li>
 * 
 * */
