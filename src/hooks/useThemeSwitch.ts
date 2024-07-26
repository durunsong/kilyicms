// 切换主题hooks
import { ref, onMounted, watch } from 'vue';

export function useThemeSwitch(initialIsDark: boolean) {
  const isDark = ref<boolean>(initialIsDark);

  const toggleTheme = (value: boolean) => {
    const transition = (document as any).startViewTransition(() => {
      document.documentElement.classList.toggle('dark', value);
      isDark.value = value;
    });

    transition.ready.then(() => {
      const { clientX, clientY } = { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }; // Center point
      const radius = Math.hypot(
        Math.max(clientX, window.innerWidth - clientX),
        Math.max(clientY, window.innerHeight - clientY)
      );
      const clipPath = [
        `circle(0% at ${clientX}px ${clientY}px)`,
        `circle(${radius}px at ${clientX}px ${clientY}px)`
      ];
      const currentIsDark = document.documentElement.classList.contains('dark');
      document.documentElement.animate(
        {
          clipPath: currentIsDark ? clipPath.reverse() : clipPath
        },
        {
          duration: 500,
          pseudoElement: currentIsDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      );
    });
  };

  watch(isDark, (newValue) => {
    toggleTheme(newValue);
  });

  onMounted(() => {
    toggleTheme(isDark.value);
  });

  return {
    isDark,
    setTheme: (value: boolean) => {
      isDark.value = value;
    }
  };
}
