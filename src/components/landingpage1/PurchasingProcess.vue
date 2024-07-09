<template>
  <div class="purchasing-process">
    <h1>{{ $t("promote_purchasing_title") }}</h1>
    <div class="process-step">
      <div
        class="per-step"
        v-for="(item, index) in stepItem"
        :key="index"
        :style="{ order: sortIndex(index + 1) }"
        >
        <el-image :src="item.icon" alt="" class="step-icon" lazy/>
        <div class="line"></div>
        <div class="step-badge">{{ index + 1 }}</div>
        <span class="step-desc">{{ item.desc }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = userPomotionStore();

const mainStore = store.imageUrl;
const screenWidth = ref(window.innerWidth);
let stepItem = computed(() => {
  let list = [
    {
      desc: t("promote_purchasing_process1"),
      icon: mainStore + "/promote/icon_daigou.png",
    },
    {
      desc: t("promote_purchasing_process2"),
      icon: mainStore + "/promote/icon_feiyong.png",
    },
    {
      desc: t("promote_purchasing_process3"),
      icon: mainStore + "/promote/icon_caigou.png",
    },
    {
      desc: t("promote_purchasing_process4"),
      icon: mainStore + "/promote/icon_zhijian.png",
    },
    {
      desc: t("promote_purchasing_process5"),
      icon: mainStore + "/promote/icon_yundan.png",
    },
    {
      desc: t("promote_purchasing_process6"),
      icon: mainStore + "/promote/icon_haoping.png",
    },
  ];
  return list;
});
// 更新屏幕宽度
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
const sortIndex = (index: number): number | undefined => {
  if (screenWidth.value <= 880) {
    // 手机屏幕
    let indexMap: { [key: number]: number } = {
      4: 6,
      5: 5,
      6: 4,
    };
    return indexMap[index];
  } else {
    // 电脑屏幕
    let indexMap: { [key: number]: number } = {
      4: 4,
      5: 5,
      6: 6,
    };
    return indexMap[index];
  }
};
</script>
<style lang="scss" scoped>
.action-btn {
  border: 0 !important;
  outline: none !important;
}

.purchasing-process {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0 100px;
  box-sizing: border-box;

  text-align: center;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 80px;
  }

  .process-step {
    box-sizing: border-box;
    position: relative;
    display: flex;
    justify-content: space-between;

    .per-step {
      display: flex;
      flex-direction: column;
      align-items: center;

      .line {
        height: 40px;
        border-left: 1px solid #ff2840;
      }

      .step-badge {
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-weight: 700;
        color: #fff;
        border-radius: 50%;
        background-color: #ff2840;
        z-index: 1;
      }

      .step-desc {
        display: inline-block;
        text-align: center;
        width: 180px;
        margin-top: 20px;
      }
    }

    &::after {
      content: "";
      position: absolute;
      width: 1100px;
      border-top: 4px solid rgba(255, 40, 64, 0.12);
      top: 134px;
      left: 50px;
    }
  }
}
@media screen and (max-width: 880px) {
  .purchasing-process {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;

    text-align: center;

    h1 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .process-step {
      box-sizing: border-box;
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .per-step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;

        .step-icon {
          width: 38px;
          height: 38px;
        }

        .line {
          height: 18px;
          border-left: 1px solid #ff2840;
        }

        .step-badge {
          width: 18px;
          height: 18px;
          line-height: 18px;
          font-weight: 700;
          color: #fff;
          border-radius: 50%;
          background-color: #ff2840;
          z-index: 1;
        }

        .step-desc {
          font-size: 12px;
          display: inline-block;
          text-align: center;
          width: 110px;
          height: 54px;
          margin-top: 10px;
        }
      }

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 50.7%;
        border: 2px solid rgba(255, 40, 64, 0.12);
        border-left: none;
        top: 64px;
        left: 0;
      }
    }
  }
}
</style>
