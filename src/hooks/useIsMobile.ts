//  设备判断hooks
import { ref, onMounted, onUnmounted, computed } from "vue";

export function useIsMobile() {
  const isMobile = ref(false);

  // 检查设备是否为移动端
  const checkIsMobile = () => {
    isMobile.value =
      window.innerWidth <= 768 ||
      !!navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/
      );
  };

  // 初始化检测
  onMounted(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
  });

  // 组件卸载时清除事件监听
  onUnmounted(() => {
    window.removeEventListener("resize", checkIsMobile);
  });

  return computed(() => isMobile.value);
}
