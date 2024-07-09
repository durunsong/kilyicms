//  设备判断hooks
import { computed } from 'vue';
export function useIsMobile() {
  const isMobile = computed(() => {
    return !!navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/
    );
  });
  return isMobile;
}
