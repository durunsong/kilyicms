<template>
  <div class="landingpage2">
    <div class="top_landingpage">
      <el-image :src="tuiguangURL + '/common/HagoBuy.png'" class="tg_logo" lazy />
      <div class="top_landingpage_right">
        <el-button class="top_landingpage_red_button" @click="goHagoBuyRe">SIGN UP</el-button>
        <el-button class="top_landingpage_white_button" @click="goHagoBuyLogin">SIGN IN</el-button>
      </div>
      <!-- 移动端效果 -->
      <div class="top_landingpage_icon">
        <transition name="icon-fade">
          <el-icon size="25" @click="unfoldHandler">
            <component :is="isFlag ? 'CloseBold' : 'Operation'" />
          </el-icon>
        </transition>
      </div>
    </div>
    <transition name="fade">
      <div class="banner_land_page" v-if="isFlag">
        <div class="banner_land_page_in">
          <el-button class="btn1" @click="goHagoBuyRe">SIGN UP</el-button>
          <el-button class="btn2" @click="goHagoBuyLogin">SIGN IN</el-button>
        </div>
      </div>
    </transition>
    <div class="banner_landingpage">
      <div class="posi_images">
        <div class="podsition_div">
          <div class="btn_div">
            <span class="btn_click" @click.stop="confirmHandler('GG-HAGOBUYS_GOOD')">Click to claim</span>
          </div>
        </div>
        <el-image src="https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/laoza.png" class="banner_img" lazy />
      </div>
      <el-image src="https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/laoza.png" class="banner_img"
        @click="goHagoBuyRe" lazy />
      <div class="swiper_product">
        <el-carousel indicator-position="none" :height="carouselHeight" ref="slideCarousel" :autoplay="autoplayTa">
          <el-carousel-item v-for="item in 5" :key="item">
            <el-image :src="'https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/mao-' + item + '.png'"
              @click="goHagoBuyRe" class="banner_img_swiper" lazy />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-image src="https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/laoza.png" class="banner_img"
        @click="goHagoBuyRe" lazy />
      <el-image src="https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/laoza.png" class="banner_img"
        @click="goHagoBuyRe" lazy />
      <el-image src="https://nuxt-static-oss.oss-cn-hangzhou.aliyuncs.com/laoza.png" class="banner_img"
        @click="goHagoBuyRe" lazy />
    </div>
    <div class="fixed_btn" v-if="showFixedBtn">
      <div class="flxed_btn_in" @click.stop="confirmHandler('GG-HAGOBUYS_GOOD')">
        <span>Click to claim</span>
      </div>
    </div>
  </div>
  <!-- 复制提示弹窗 -->
  <!-- <el-dialog v-model="centerDialogVisible" :width="dialogWidth" align-center>
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
</el-dialog> -->
</template>

<script setup lang="ts">
import { userPomotionStore } from "@/store";
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAffcode } from "@/hooks/useAffcode";
// 复制文字
import useClipboard from "vue-clipboard3";
const store = userPomotionStore();
// 图片链接
const tuiguangURL = store.tuiguangURL;

const { toClipboard } = useClipboard();
const { t } = useI18n();
const autoplayTa = ref(true);
const slideCarousel = ref();
const centerDialogVisible = ref(false);
const isFlag = ref(false);
const carouselHeight = ref(window.innerWidth <= 991 ? "300px" : "900px");
const dialogWidth = ref(window.innerWidth <= 991 ? "360px" : "400px");
const showFixedBtn = ref(false);

const handleScroll = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (window.innerWidth <= 991) {
    showFixedBtn.value = scrollTop > 220;
  } else {
    showFixedBtn.value = scrollTop > 600;
  }
};

const updateCarouselHeight = () => {
  carouselHeight.value = window.innerWidth <= 991 ? "300px" : "900px";
  dialogWidth.value = window.innerWidth <= 991 ? "360px" : "400px";
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener("resize", updateCarouselHeight);
  slideBanner();
  useAffcode()
});

onUnmounted(() => {
  window.removeEventListener("resize", updateCarouselHeight);
  window.removeEventListener('scroll', handleScroll);
});

const arr2 = ['面', '试']

const confirmHandler = async (text: string): Promise<void> => {
  // centerDialogVisible.value = false;
  await toClipboard(text);
  await goHagoBuyRe();
};
const handlerDialog = () => {
  centerDialogVisible.value = true;
};

const goHagoBuyLogin = () => {
  window.open(store.dynamicURLKeys('hagobuyLoginURL'), "_blank");  // pc
  // window.open(store.dynamicURLKeys('m_hagobuyLoginURL'), "_blank");  // mobile
};

const goHagoBuyRe = () => {
  window.open(store.dynamicURLKeys('hagobuyURL'), "_blank");  // pc
  // window.open(store.dynamicURLKeys('m_hagobuyURL'), "_blank");  // mobile
};

const goHagoBuyHome = () => {
  window.open(store.dynamicURLKeys('hagobuy'), "_blank"); // pc
  // window.open(store.dynamicURLKeys('m_hagobuy'), "_blank");  // mobile
};

const unfoldHandler = () => {
  isFlag.value = !isFlag.value;
};

const slideBanner = () => {
  let box: Element | null = document.querySelector(".el-carousel__container")!; // 非空断言
  let startPointX = 0;
  let stopPointX = 0;

  box.addEventListener("touchstart", function (e: any) {
    startPointX = e.changedTouches[0].pageX;
    autoplayTa.value = false;
  });

  box.addEventListener("touchmove", function (e: any) {
    stopPointX = e.changedTouches[0].pageX;
  });

  box.addEventListener("touchend", function (e: any) {
    if (stopPointX === 0 || startPointX - stopPointX === 0) {
      autoplayTa.value = true;
      return;
    }
    if (startPointX - stopPointX > 0) {
      slideCarousel.value.next();
      autoplayTa.value = true;
    } else if (startPointX - stopPointX < 0) {
      slideCarousel.value.prev();
      autoplayTa.value = true;
    }
  });
};

</script>

<style lang="scss" scoped>
$containerWidth: 500px;
$containerHeight: 200px;
$elementWidth: 250px;
$elementHeight: 60px;

.posi_images {
  position: relative;
  width: 100%;
  margin-bottom: -5px;

  .banner_img {
    height: 100%;
  }
}

.podsition_div {
  position: absolute;
  bottom: 20px;
  left: 400px;
  top: calc(75% - (#{$containerHeight}/ 2));
  left: calc(56.4% - (#{$containerWidth} / 2));
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  z-index: 99;

  .btn_div {
    display: flex;
    height: 90px;
  }
}

.btn_click {
  animation: scaleDrew 1.2s ease-in-out infinite;
  display: flex;
  background-color: #fef5a9;
  height: 70px;
  align-items: center;
  border-radius: 35px;
  width: 350px;
  justify-content: center;
  color: #ff2840;
  font-weight: bold;
  cursor: pointer;
  font-size: 24px;

  background: linear-gradient(180deg, #FEF5A9 0%, #FFA64B 98%);

  box-shadow: 0px 5px 0px 0px #B60F0F;
}

@keyframes scaleDrew {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.3);
  }

  100% {
    transform: scale(1);
  }
}

.banner_img_swiper {
  height: 100%;
  width: 100%;
}

.landingpage2 {
  display: flex;
  flex-flow: column;
  padding-bottom: 30px;


  .banner_land_page {
    height: 0px;
    display: none;
  }

  .top_landingpage {
    display: flex;
    justify-content: space-between;
    height: 64px;
    align-items: center;

    .tg_logo {
      width: 108px;
      height: 22px;
      margin-left: 40px;
    }

    .top_landingpage_icon {
      display: none;
    }

    .top_landingpage_right {
      margin-right: 40px;
      display: flex;
      align-items: center;

      .top_landingpage_red_button {
        height: 45px;
        width: 105px;
        background-color: #ff2840;
        border: none;
        color: #fff;
        font-weight: bold;
      }

      .top_landingpage_white_button {
        height: 44px;
        width: 105px;
        border: 1px solid #ff2840;
        color: #ff2840;
        background-color: #fff;
        font-weight: bold;
      }
    }
  }

  .banner_landingpage {
    max-width: 1288px;
    margin: 0 auto;
    display: flex;
    flex-flow: column;

    .banner_img {
      width: 100%;
      margin-bottom: 15px;
    }

    .swiper_product {
      width: 100%;
      margin-bottom: 15px;
    }
  }
}

@media screen and (max-width: 3000px) {
  .btn_click {
    animation: scaleDrew 1.2s ease-in-out infinite;
    display: flex;
    background-color: #fef5a9;
    height: 70px;
    align-items: center;
    border-radius: 35px;
    width: 350px;
    justify-content: center;
    color: #ff2840;
    font-weight: bold;
    cursor: pointer;
    font-size: 30px;
    background: linear-gradient(180deg, #FEF5A9 0%, #FFA64B 98%);
    box-shadow: 0px 10px 0px 0px #B60F0F;
  }

  .fixed_btn {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;

    .flxed_btn_in {
      display: flex;
      border-radius: 25px;
      justify-content: center;
      align-items: center;
      height: 80px;
      align-items: center;
      border-radius: 30px;
      width: 400px;

      span {
        display: flex;
        background-color: #fef5a9;
        height: 70px;
        align-items: center;
        border-radius: 35px;
        width: 400px;
        justify-content: center;
        color: #ff2840;
        font-weight: bold;
        cursor: pointer;
        font-size: 30px;
        background: linear-gradient(180deg, #FEF5A9 0%, #FFA64B 98%);
        box-shadow: 0px 10px 0px 0px #B60F0F;
      }
    }
  }

  .landingpage2 {
    padding-bottom: 120px;
    display: flex;
    flex-flow: column;

    .banner_land_page {
      height: 0px;
      display: none;
    }

    .top_landingpage {
      display: flex;
      justify-content: space-between;
      height: 64px;
      align-items: center;

      .tg_logo {
        width: 108px;
        height: 22px;
        margin-left: 40px;
      }

      .top_landingpage_icon {
        display: none;
      }

      .top_landingpage_right {
        margin-right: 40px;
        display: flex;
        align-items: center;

        .top_landingpage_red_button {
          height: 45px;
          width: 105px;
          background-color: #ff2840;
          border: none;
          color: #fff;
          font-weight: bold;
        }

        .top_landingpage_white_button {
          height: 44px;
          width: 105px;
          border: 1px solid #ff2840;
          color: #ff2840;
          background-color: #fff;
          font-weight: bold;
        }
      }
    }

    .banner_landingpage {
      max-width: 1288px;
      margin: 0 auto;
      display: flex;
      flex-flow: column;

      .banner_img {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 991px) {
  .fixed_btn {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 80px;
    width: 100%;
    justify-content: center;
    align-items: center;

    .flxed_btn_in {
      background-color: #FEF39F;
      display: flex;
      height: 50px;
      width: 200px;
      border-radius: 25px;
      justify-content: center;
      align-items: center;

      span {
        display: flex;
        background-color: #fef5a9;
        height: 40px;
        align-items: center;
        border-radius: 35px;
        width: 350px;
        justify-content: center;
        color: #ff2840;
        font-weight: bold;
        cursor: pointer;
        font-size: 20px;
        background: linear-gradient(180deg, #FEF5A9 0%, #FFA64B 98%);
        box-shadow: 0px 5px 0px 0px #B60F0F;
      }
    }
  }

  .posi_images {
    position: relative;
    width: 100%;
  }

  .podsition_div {
    position: absolute;
    top: calc(78% - (#{$elementHeight}/ 2));
    left: calc(50% - (#{$elementWidth} / 2));
    width: 250px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    z-index: 99;

    .btn_div {
      display: flex;
      height: 30px;
    }
  }

  .btn_click {
    animation: scaleDrew 1.2s ease-in-out infinite;
    display: flex;
    background-color: #fef5a9;
    height: 30px;
    align-items: center;
    border-radius: 15px;
    width: 150px;
    justify-content: center;
    color: #ff2840;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    background: linear-gradient(180deg, #FEF5A9 0%, #FFA64B 98%);
    box-shadow: 0px 5px 0px 0px #B60F0F;
  }

  @keyframes scaleDrew {
    0% {
      transform: scale(1);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(1);
    }
  }

  .icon-fade-enter-active,
  .icon-fade-leave-active {
    transition: opacity 0.5s;
  }

  .icon-fade-enter,
  .icon-fade-leave-to {
    opacity: 0;
  }

  .height-fade-enter-active,
  .height-fade-leave-active {
    transition: height 0.5s ease-in-out;
  }

  .height-fade-enter,
  .height-fade-leave-to {
    height: 0;
    overflow: hidden;
  }

  .landingpage2 {
    padding-bottom: 80px;
    display: flex;
    flex-flow: column;


    .banner_land_page {
      height: 90px;
      display: flex;
      justify-content: center;

      .banner_land_page_in {
        width: 250px;
        height: 50px;
        margin-top: 35px;

        .btn1 {
          height: 45px;
          width: 105px;
          background-color: #ff2840;
          border: none;
          color: #fff;
          font-weight: bold;
        }

        .btn2 {
          height: 44px;
          width: 105px;
          border: 1px solid #ff2840;
          color: #ff2840;
          background-color: #fff;
          font-weight: bold;
        }
      }
    }

    .top_landingpage {
      display: flex;
      justify-content: space-between;
      height: 64px;
      align-items: center;

      .tg_logo {
        width: 80px;
        height: 17px;
        margin-left: 10px;
      }

      .top_landingpage_icon {
        display: flex;
        margin-right: 20px;
      }

      .top_landingpage_right {
        display: none;
      }
    }

    .banner_landingpage {
      max-width: 1288px;
      margin: 0 auto;
      display: flex;
      flex-flow: column;

      .banner_img {
        width: 100%;
      }
    }
  }
}
</style>
