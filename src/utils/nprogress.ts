import nprogress from "nprogress";
import "nprogress/nprogress.css";

// 自定义样式
const progressBarStyle = document.createElement('style');
progressBarStyle.innerHTML = `
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: #29d; /* 进度条颜色 */
    height: 2px; /* 进度条高度 */
    box-shadow: 0 0 3px #29d, 0 0 3px #29d; /* 发光效果 */
  }
  #nprogress .peg {
    display: none; /* 去掉默认的小圆圈 */
  }
`;
document.head.appendChild(progressBarStyle);

// 进度条配置
nprogress.configure({
  easing: "ease-in-out", // 更柔和的动画方式
  speed: 500, // 递增进度条的速度，稍微放慢让动画更自然
  showSpinner: false, // 隐藏加载ico
  trickleSpeed: 100, // 自动递增的间隔
  minimum: 0.15, // 启动时的最小百分比，稍微降低，增加平滑度
  parent: "body", // 进度条的父容器
});

export default nprogress;
