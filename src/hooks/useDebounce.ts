// 事件防抖hooks
import { ref, onUnmounted } from "vue";

type Timer = ReturnType<typeof setTimeout> | null;

export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate = false,
): (...args: Parameters<T>) => void {
  const timeout = ref<Timer>(null);

  const debounceFn = (...args: Parameters<T>) => {
    const later = () => {
      timeout.value = null;
      if (!immediate) func(...args);
    };

    const callNow = immediate && !timeout.value;

    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(later, wait);

    if (callNow) func(...args);
  };

  onUnmounted(() => {
    if (timeout.value) {
      clearTimeout(timeout.value);
    }
  });

  return debounceFn;
}

/**  ---- 使用方式 ----
 * import { useDebounce } from '@/hooks/useDebounce'; // 引入防抖函数
 *
 * debouncedHandleSearchItems是按钮点击事件/@input等事件的函数名
 *
 * const debouncedHandleSearchItems = useDebounce(handleSearchItems, 2000, true);
 *
 * **/
