// 根据当前时间生成问候语
import { ElNotification } from 'element-plus';
import { h } from 'vue'

export function useGreeting() {
    const getGreetingMessage = (userName: string) => {
        const currentHour = new Date().getHours();
        let greeting = '';

        if (currentHour < 12) {
            greeting = `早上好，${userName}`;
        } else if (currentHour < 18) {
            greeting = `下午好，${userName}`;
        } else {
            greeting = `晚上好，${userName}`;
        }

        return greeting;
    };

    const showGreetingNotification = (message: string, userName: string) => {
        const greetingMessage = getGreetingMessage(userName);

        ElNotification({
            title: message,
            message: h('i', { style: 'color: teal' }, greetingMessage),
            type: 'success',
        });
    };

    return {
        showGreetingNotification,
    };
}
