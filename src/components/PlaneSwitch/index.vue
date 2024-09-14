<template>
  <label class="plane_switch">
    <input type="checkbox" v-model="checked" @change="handleChange" />
    <div>
      <div>
        <SvgIcon name="slipway" color="currentColor" />
      </div>
      <span class="street_middle" />
      <span class="cloud" />
      <span class="cloud two" />
    </div>
  </label>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits<{
  (e: "update:checked", checked: boolean): void;
}>();

const checked = ref(true);

// 处理开关状态变化
const handleChange = () => {
  console.log("Switch toggled", checked.value);
  // 发出事件，将 checked 状态传递给父组件
  emit("update:checked", checked.value);
};
</script>

<style scoped>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.plane_switch {
  --dot: #fff;
  --street: #6b6d76;
  --street-line: #a8aab4;
  --street-line-mid: #c0c2c8;
  --sky-1: #60a7fa;
  --sky-2: #2f8efc;
  --light-1: rgba(255, 233, 0, 1);
  --light-2: rgba(255, 233, 0, 0.3);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.plane_switch input {
  display: none;
}

.plane_switch input + div {
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 25px;
  padding: 1px;
  border-radius: 13px;
  background: linear-gradient(
      90deg,
      var(--street) 0%,
      var(--street) 25%,
      var(--sky-1) 75%,
      var(--sky-2) 100%
    )
    left var(--p, 0%) top 0;
  background-position-x: var(--p, 0%);
  background-size: 400% auto;
  transition: background-position 0.6s;
}

.plane_switch input + div:before,
.plane_switch input + div:after {
  content: "";
  display: block;
  position: absolute;
  transform: translateX(var(--s, 0));
  transition: transform 0.3s;
}

.plane_switch input + div:before {
  width: 42px;
  right: 2px;
  top: 4px;
  height: 1px;
  background: var(--street-line);
  box-shadow: 0 16px 0 0 var(--street-line);
}

.plane_switch input + div:after {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  left: 23px;
  top: 1px;
  -webkit-animation: lights2 2s linear infinite;
  animation: lights2 2s linear infinite;
  box-shadow:
    inset 0 0 0 2px var(--light-1),
    0 21px 0 var(--light-1),
    8px 0 0 var(--light-2),
    8px 21px 0 var(--light-2),
    16px 0 0 var(--light-2),
    16px 21px 0 var(--light-2);
}

.plane_switch input + div span {
  display: block;
  position: absolute;
}

.plane_switch input + div span.street_middle {
  top: 12px;
  left: 21px;
  width: 3px;
  height: 1px;
  transform: translateX(var(--s, 0));
  background: var(--street-line-mid);
  box-shadow:
    5px 0 0 var(--street-line-mid),
    10px 0 0 var(--street-line-mid),
    15px 0 0 var(--street-line-mid),
    20px 0 0 var(--street-line-mid),
    25px 0 0 var(--street-line-mid);
  transition: transform 0.3s;
}

.plane_switch input + div span.cloud {
  width: 12px;
  height: 4px;
  border-radius: 2px;
  background: #fff;
  position: absolute;
  top: var(--ct, 8px);
  left: 100%;
  opacity: var(--co, 0);
  transition: opacity 0.3s;
  -webkit-animation: clouds2 2s linear infinite var(--cd, 0s);
  animation: clouds2 2s linear infinite var(--cd, 0s);
}

.plane_switch input + div span.cloud:before,
.plane_switch input + div span.cloud:after {
  content: "";
  position: absolute;
  transform: translateX(var(--cx, 0));
  border-radius: 50%;
  width: var(--cs, 5px);
  height: var(--cs, 5px);
  background: #fff;
  bottom: 1px;
  left: 1px;
}

.plane_switch input + div span.cloud:after {
  --cs: 6px;
  --cx: 4px;
}

.plane_switch input + div span.cloud.two {
  --ct: 20px;
  --cd: 1s;
  opacity: var(--co-2, 0);
}

.plane_switch input + div div {
  display: table;
  position: relative;
  z-index: 1;
  padding: 5px;
  top: 1px;
  left: 1px;
  border-radius: 50%;
  background: var(--dot);
  transform: translateX(var(--x, 0));
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.35, 1.2);
}

.plane_switch input + div div svg {
  width: 13px;
  height: 13px;
  display: block;
  color: var(--c, var(--street));
  transition: color 0.6s;
}

.plane_switch input:checked + div {
  --p: 100%;
  --x: 25px;
  --s: -50px;
  --c: var(--sky-2);
  --co: 0.8;
  --co-2: 0.6;
}

@keyframes lights2 {
  20%,
  30% {
    box-shadow:
      inset 0 0 0 2px var(--light-2),
      0 21px 0 var(--light-2),
      8px 0 0 var(--light-1),
      8px 21px 0 var(--light-1),
      16px 0 0 var(--light-2),
      16px 21px 0 var(--light-2);
  }

  55%,
  65% {
    box-shadow:
      inset 0 0 0 2px var(--light-2),
      0 21px 0 var(--light-2),
      8px 0 0 var(--light-2),
      8px 21px 0 var(--light-2),
      16px 0 0 var(--light-1),
      16px 21px 0 var(--light-1);
  }

  90%,
  100% {
    box-shadow:
      inset 0 0 0 2px var(--light-1),
      0 21px 0 var(--light-1),
      8px 0 0 var(--light-2),
      8px 21px 0 var(--light-2),
      16px 0 0 var(--light-2),
      16px 21px 0 var(--light-2);
  }
}

@keyframes clouds2 {
  97% {
    transform: translateX(-72px);
    visibility: visible;
  }

  98%,
  100% {
    visibility: hidden;
  }

  99% {
    transform: translateX(-72px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
