// 根据当前时间生成问候语
import { ElNotification } from "element-plus";
import { h } from "vue";

export function useGreeting(t: (key: string) => string) {
  const getGreetingMessage = (userName: string) => {
    const currentHour = new Date().getHours();
    let greeting = "";

    if (currentHour < 12) {
      greeting = `${t("good_morning")}, ${userName}`;
    } else if (currentHour < 18) {
      greeting = `${t("good_afternoon")}, ${userName}`;
    } else {
      greeting = `${t("good_evening")}, ${userName}`;
    }

    return greeting;
  };

  const showGreetingNotification = (message: string, userName: string) => {
    const greetingMessage = getGreetingMessage(userName);

    ElNotification({
      title: message,
      message: h("i", { style: "color: teal" }, greetingMessage),
      type: "success"
    });
  };

  return {
    showGreetingNotification
  };
}
