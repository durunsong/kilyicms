//  当前时间自定义hooks
import { ref, onMounted, onBeforeUnmount } from 'vue';

const getCurrentTime = () => {
    const time = new Date();
    const year = String(time.getFullYear());
    const month = String(time.getMonth() + 1).padStart(2, '0');
    const day = String(time.getDate()).padStart(2, '0');
    const hour = String(time.getHours()).padStart(2, '0');
    const minute = String(time.getMinutes()).padStart(2, '0');
    const second = String(time.getSeconds()).padStart(2, '0');
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const week = '星期' + weekDays[time.getDay()];

    return `${year}年${month}月${day}日 ${hour}:${minute}:${second} ${week}`;
};

export const useRealTime = () => {
    const currentTime = ref(getCurrentTime());
    let timer: NodeJS.Timeout | null = null;

    const updateTime = () => {
        currentTime.value = getCurrentTime();
    };

    onMounted(() => {
        timer = setInterval(updateTime, 1000);
    });

    onBeforeUnmount(() => {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }
    });

    return {
        currentTime,
    };
};

/**
 * 用法
 *  <p>当前时间：{{ currentTime }}</p>
    const { currentTime } = useRealTime();
 * 
 * */ 