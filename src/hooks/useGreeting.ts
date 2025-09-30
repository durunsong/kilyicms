// 根据当前时间生成问候语
import { ElNotification } from "element-plus";
import { h } from "vue";

export function useGreeting(t: (key: string) => string) {
  const getGreetingMessage = (user_name: string) => {
    const currentHour = new Date().getHours();
    let greeting = "";

    if (currentHour < 12) {
      greeting = `${t("good_morning")}, ${user_name}`;
    } else if (currentHour < 18) {
      greeting = `${t("good_afternoon")}, ${user_name}`;
    } else {
      greeting = `${t("good_evening")}, ${user_name}`;
    }

    return greeting;
  };

  const showGreetingNotification = (message: string, user_name: string) => {
    const greetingMessage = getGreetingMessage(user_name);

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
