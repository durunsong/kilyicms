<!--  推广页 ---- 1 -->
<template>
  <div id="promote">
    <!-- 移动端 头栏 -->
    <div class="promote-header">
      <a :href="store.dynamicURLKeys('hagobuy')" class="logo">
        <el-image :src="`${mainStore}/logo.png`" lazy class="img_logo"/>
      </a>
      <div class="switch-language">
        <el-image
          :src="`${mainStore}/promote/m_icon_yuyan.jpg`"
          @click.stop="showLang = true"
          class="icon"
          lazy
        />
        <div v-show="showLang" class="language_ul">
          <div  @click="handleShowLang('zh')">
            <!-- :class="getActiveClass('zh')" -->
            简体中文
          </div>
          <div @click="handleShowLang('en')" >
            <!-- :class="getActiveClass('en')" -->
            English
          </div>
        </div>
      </div>
    </div>
    <div class="promote-content">
      <div class="banner">
        <div class="banner-content">
          <h1>{{ t("promote_banner_title") }}</h1>
          <span class="desc-span">{{ t("promote_banner_desc") }}</span>
          <button class="code-btn" @click="handlerDialog">
            <div class="code">
              {{ t("promote_banner_btn_code") }} GG-HAGOBUYS_GOOD
            </div>
            <span class="code-desc">{{ t("promote_banner_btn_desc") }}</span>
          </button>
        </div>
      </div>
      <!-- 介绍 -->
      <div class="hg-desc">
        <div class="desc-scrip">
          <h2>{{ t("promote_about_title") }}</h2>
          <span>{{ t("promote_about_desc1") }}</span>
          <span>{{ t("promote_about_desc2") }}</span>
          <span>{{ t("promote_about_desc3") }}</span>
          <div class="action-btn">
            <a :href="store.dynamicURLKeys('hagobuy')" class="common-a purchasing">{{
              t("promote_about_purchasing")
            }}</a>
            <a :href="store.dynamicURLKeys('hagobuyURLforwarding')" class="common-a transport">{{
              t("promote_about_transport")  
            }}   </a>
          </div>
        </div>
        <el-image
          :src="`${mainStore}/promote/img_logo.png`"
          class="desc-img"
          lazy
        />
      </div>
      <!-- 代购流程 -->
      <PurchasingProcess></PurchasingProcess>
      <!-- 优势 -->
      <Advantage @signUp="signUp"></Advantage>
      <!-- 商业伙伴 -->
      <Partner></Partner>
      <!-- 特别处 -->
      <Difference></Difference>
      <!-- 用户评论 -->
      <Customers @signUp="signUp"></Customers>
      <!-- 常见问题 -->
      <CommonProblem></CommonProblem>
      <!-- 注册 -->
      <div class="sidebar">
        <h1>{{ t("promote_sidebar_title") }}</h1>
        <button class="sign-up" @click="signUp">
          {{ t("promote_sidebar_btn") }}
        </button>
      </div>
    </div>
    <el-dialog v-model="centerDialogVisible" :width="dialogWidth"  align-center>
      <span>{{ t("promote_banner_btn_confirm_content") }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">{{
            t("confirm_cancel_text")
          }}</el-button>
          <el-button type="danger" @click="confirmHandler('GG-HAGOBUYS_GOOD')">
            {{ t("confirm_ok_text") }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import PurchasingProcess from "@/components/landingpage1/PurchasingProcess.vue";
import Advantage from "@/components/landingpage1/Advantage.vue";
import Partner from "@/components/landingpage1/Partner.vue";
import Difference from "@/components/landingpage1/Difference.vue";
import Customers from "@/components/landingpage1/Customers.vue";
import CommonProblem from "@/components/landingpage1/CommonProblem.vue";
// 复制文字
import useClipboard from "vue-clipboard3";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
import { ref, computed,onMounted,onUnmounted } from "vue";
import { useAffcode } from "@/hooks/useAffcode";

const { t, locale } = useI18n();
const store = userPomotionStore();
const showLang = ref(false);
const { toClipboard } = useClipboard();
const centerDialogVisible = ref(false);

// 图片地址链接
const mainStore = store.imageUrl;

const dialogWidth = ref(window.innerWidth <= 991 ? "360px" : "400px");

const updateCarouselHeight = () => {
  dialogWidth.value = window.innerWidth <= 991 ? "360px" : "400px";
};
onMounted(() => {
  window.addEventListener("resize", updateCarouselHeight);
  useAffcode()
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselHeight);
});

let language = computed(() => {
  return localStorage.getItem("localLang");
});

// active 颜色
const getActiveClass = (lang: string) => {
  return language.value === lang ? "active" : "";
};

const handleShowLang = (lang: string) => {
  showLang.value = false;
  locale.value = lang;
  localStorage.setItem("localLang", lang);
};
const confirmHandler = async (text: string): Promise<void> => {
  centerDialogVisible.value = false;
  await toClipboard(text);
  await freeFreight();
};
const handlerDialog = () => {
  centerDialogVisible.value = true;
};

const freeFreight = () => {
  window.open(store.dynamicURLKeys('hagobuyURL'),'_blank');
  
};

const signUp = () => {
  window.open(store.dynamicURLKeys('hagobuyURL'),'_blank');
};
</script>

<style scoped lang="scss">
$imageUrl: "https://cfstatic.hagoby.com/www/pic";

a {
  text-decoration: none;
}

.active {
  color: #ff2840;
}

:deep(.el-dialog__close) {
  display: none;
}

:deep(.el-dialog) {
  border-radius: 10px;
}

#promote {
  width: 100%;
  height: 100%;
}

.code-btn,
.sign-up {
  border: 0 !important;
  outline: none !important;
}
.promote-header,
.promote-footer {
  display: none;
}

.promote-header {
  width: 100%;
  padding: 2px 20px 2px 15px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box !important;

  .logo {
    display: block;
    flex-shrink: 0;
    height: 40px;

    .img_logo {
      display: block;
      height: 100%;
      width: auto;
    }
  }

  .switch-language {
    position: relative;

    .icon {
      cursor: pointer;
      display: block;
      width: 20px;
      height: 20px;
    }

    .language_ul {
      z-index: 2000;
      position: absolute;
      border: 1px solid #eee;
      border-radius: 6px;
      background-color: #fff;
      top: calc(100% + 15px);
      display: flex;
      flex-direction: column;
      right: -10px;
      list-style: none;

      div {
        width: auto;
        white-space: nowrap;
        padding: 6px 14px;
        box-sizing: border-box;

        a {
          display: inline-block;
          width: 100%;
        }
      }

      &::before {
        content: "";
        z-index: 1996;
        position: absolute;
        border: 6px solid #fff;
        border-top-color: transparent;
        border-right-color: transparent;
        border-left-color: transparent;
        top: -12px;
        right: 12px;
      }

      &::after {
        content: "";
        position: absolute;
        border: 7px solid #eee;
        border-top-color: transparent;
        border-right-color: transparent;
        border-left-color: transparent;
        top: -14px;
        right: 11px;
      }
    }
  }
}

.promote-footer {
  background-color: #333;
  margin-top: 100px;
  padding: 32px 19px;
  box-sizing: border-box;

  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;

  p {
    margin: 0;
    padding-top: 15px;
    box-sizing: border-box;

    border-top: 1px solid #444;
  }
}
.promote-content {
  h2 {
    font-size: 32px;
    font-weight: 700;
  }
  .banner {
    height: 520px;
    background: url("#{$imageUrl}/promote/bg_banner2x.jpg") 100% no-repeat;
    background-size: 100% 100%;
    text-align: center;

    .banner-content {
      width: 1100px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      h1 {
        font-size: 48px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 0;
      }

      .desc-span {
        color: #fff;
        font-size: 20px;
        margin-top: -10px;
      }

      .code-btn {
        width: 640px;
        height: 100px;
        background: #ffffff;
        border-radius: 8px;
        color: #ff2840;

        &:hover {
          cursor: pointer;
        }

        .code {
          color: #ff2840;
          font-size: 32px;
          font-weight: 700;
        }
        .code-desc {
          font-size: 16px;
        }
      }
    }
  }

  .hg-desc {
    width: 1200px;
    height: 488px;
    padding: 60px 10px;
    box-sizing: border-box;

    margin: 40px auto;
    display: flex;
    justify-content: space-between;

    .desc-scrip {
      width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      span {
        font-size: 16px;
        display: inline-block;
      }

      .action-btn {
        .common-a {
          cursor: pointer;
          display: inline-block;
          min-width: 140px;
          font-size: 16px;
          text-align: center;
          border-radius: 4px;
          padding: 12px 28px;
          box-sizing: border-box;
        }

        .purchasing {
          color: #fff;
          border: 1px solid #ff2840;
          background: #ff2840;
          margin-right: 20px;
        }

        .transport {
          color: #ff2840;
          background-color: inherit;
          border: 1px solid #e5152c;
        }
      }
    }

    .desc-img {
      width: 468px;
      height: 350px;
    }
  }

  .sidebar {
    background: url("#{$imageUrl}/promote/img_sidebar_bg.jpg") 100% no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
    height: 260px;
    padding: 30px 0;
    box-sizing: border-box;

    margin-bottom: -100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    h1 {
      font-size: 32px;
      color: #fff;
      font-weight: 700;
    }

    .sign-up {
      cursor: pointer;
      font-size: 16px;
      font-weight: 700;
      background-color: #fff;
      color: #ff2840;
      padding: 15px 69px;
      box-sizing: border-box;

      border-radius: 4px;
    }
  }

  @media screen and (max-width: 880px) {
    .banner {
      height: fit-content;
      padding: 22px 18px;
      box-sizing: border-box;
      background: url("#{$imageUrl}/promote/bg_banner2x.jpg") 100% no-repeat;
      background-size: 100% 100%;
      text-align: center;

      .banner-content {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        h1 {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 15px;
        }

        .desc-span {
          color: #fff;
          font-size: 12px;
          margin-bottom: 19px;
        }

        .code-btn {
          width: 300px;
          height: 60px;
          background: #ffffff;
          border-radius: 8px;
          color: #ff2840;

          &:hover {
            cursor: pointer;
          }

          .code {
            color: #ff2840;
            font-size: 16px;
            font-weight: 700;
          }
          .code-desc {
            font-size: 12px;
          }
        }
      }
    }

    .hg-desc {
      width: 100%;
      height: fit-content;
      padding: 10px 20px;
      box-sizing: border-box;

      margin: 0 auto;
      background: url("#{$imageUrl}/promote/m_bg_who.jpg") 100% no-repeat;
      background-size: 100% 100%;

      .desc-scrip {
        display: flex;
        flex-direction: column;

        h2 {
          text-align: center;
          color: #fff;
          font-size: 16px;
        }

        span {
          font-size: 12px;
          color: #fff;
          display: inline-block;
          margin-bottom: 10px;
        }

        .action-btn {
          margin: 0 auto;
          .common-a {
            cursor: pointer;
            display: inline-block;
            min-width: 100px;
            text-align: center;
            border-radius: 4px;
            padding: 5px 21px;
            box-sizing: border-box;

            color: #fff;
            min-width: 120px;
          }

          .purchasing {
            border: 1px solid #ff2840;
            background: #ff2840;
            margin-right: 20px;
          }

          .transport {
            background-color: inherit;
            background: #ff2840;
            border: 1px solid #e5152c;
          }
        }
      }

      .desc-img {
        display: none;
      }
    }
    .sidebar {
      padding: 21px 0;
      box-sizing: border-box;

      height: fit-content;
      h1 {
        font-size: 14px;
        margin-bottom: 20px;
      }

      .sign-up {
        font-size: 14px;
        padding: 11px 33px;
        box-sizing: border-box;
      }
    }
  }
}
@media screen and (max-width: 880px) {
  .common-header,
  .common-footer {
    display: none;
  }

  .promote-header,
  .promote-footer {
    display: flex;
  }
}
</style>
