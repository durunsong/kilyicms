import { onMounted, onUnmounted } from "vue";

export function useDetectDevTools() {
  const check = function () {
    function doCheck(a: any) {
      if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
        (function () {})["constructor"]("debugger")();
      } else {
        (function () {})["constructor"]("debugger")();
      }
      doCheck(++a);
    }
    doCheck(0);
  };

  onMounted(() => {
    const intervalId = setInterval(check, 1000); // 每秒检测一次

    onUnmounted(() => {
      clearInterval(intervalId);
    });
  });
}
