<template>
  <div class="customers_nav">
    <h1>{{ t("promote_customers_title") }}</h1>
    <div class="slideshow">
      <el-carousel :autoplay="true" indicator-position="outside" arrow="never">
        <el-carousel-item
          class="content"
          v-for="(item, index) in customersItem"
          :key="index"
        >
          <CustomerCard :item="item" /> 
        </el-carousel-item>
      </el-carousel>
      <button class="action-btn" @click="signUp">
        {{ t("promote_sign_up_btn") }}
      </button>
    </div>
    <div class="mobile-slideshow">
      <el-carousel autoplay indicator-position="outside" arrow="never">
        <el-carousel-item
          class="content"
          v-for="(item, index) in mobileCustomersItem"
          :key="index"
        >
          <CustomerCard :item="item" :mobile="true" />
        </el-carousel-item>
      </el-carousel>
      <button class="action-btn" @click="signUp">
        {{ t("promote_sign_up_btn") }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomerCard from "./CustomerCard.vue";
import { ref, computed } from "vue";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = userPomotionStore();

const mainStore = store.imageUrl;
const emit = defineEmits(["signUp"]);

function signUp() {
  emit("signUp");
}
let customersItem = computed(() => {
  let list = [
    [
      {
        avatar: mainStore + "/promote/avatar_1.jpeg",
        desc: "I am very satisfied with the service provided by Hagobuy. They truly are listening to your requests and they are quick with their actions.\nI will definitely make other purchases with them!\nHighly recommended!!",
      },
      {
        avatar: mainStore + "/promote/avatar_2.jpeg",
        desc: "Having a background in customer service myself, I can affirm that hagobuy provides excellent service, and great customer experience is their top priority.This is my third purchase and it has been an amazing experience. They always listen and communicate effectively on time",
      },
    ],
    [
      {
        avatar: mainStore + "/promote/avatar_3.jpeg",
        desc: "First time using hagobuy, service very good, service very good at responding. fast process, got all the stuff complete .Thank you hagobuy",
      },
      {
        avatar: mainStore + "/promote/avatar_4.jpeg",
        desc: "The staff at Hagobuy are great: responsive, very reliable, and a pleasure to work with. They were also very honest; not only was my money handled with the utmost integrity, the shipping was very fast. I will definitely be back. Thank you all!",
      },
    ],
    [
      {
        avatar: mainStore + "/promote/avatar_5.jpg",
        desc: "The transaction was quick and easy, and the product shipped promptly.",
      },
      {
        avatar: mainStore + "/promote/avatar_6.jpeg",
        desc: "product was exactly as described, great help & fast communication. Top notch customer support.\nI will definitely use again",
      },
    ],
  ];
  return list;
});
let mobileCustomersItem = computed(() => {
  let list = [
    {
      avatar: mainStore + "/promote/avatar_1.jpeg",
      desc: "I am very satisfied with the service provided by Hagobuy. They truly are listening to your requests and they are quick with their actions.\nI will definitely make other purchases with them!\nHighly recommended!!",
    },
    {
      avatar: mainStore + "/promote/avatar_2.jpeg",
      desc: "Having a background in customer service myself, I can affirm that hagobuy provides excellent service, and great customer experience is their top priority.This is my third purchase and it has been an amazing experience. They always listen and communicate effectively on time",
    },
    {
      avatar: mainStore + "/promote/avatar_3.jpeg",
      desc: "First time using hagobuy, service very good, service very good at responding. fast process, got all the stuff complete .Thank you hagobuy",
    },
    {
      avatar: mainStore + "/promote/avatar_4.jpeg",
      desc: "The staff at Hagobuy are great: responsive, very reliable, and a pleasure to work with. They were also very honest; not only was my money handled with the utmost integrity, the shipping was very fast. I will definitely be back. Thank you all!",
    },
    {
      avatar: mainStore + "/promote/avatar_5.jpg",
      desc: "The transaction was quick and easy, and the product shipped promptly.",
    },
    {
      avatar: mainStore + "/promote/avatar_6.jpeg",
      desc: "Product was exactly as described, great help & fast communication. Top notch customer support.\nI will definitely use again",
    },
  ];
  return list;
});
</script>

<style lang="scss" scoped>
 :deep(.el-carousel__indicators) {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    height: 30px;
    li {
      width: 60px;
    }
  }
:deep(.el-carousel__container) {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-bottom: 40px;
  box-sizing: border-box;
}

:deep(.el-carousel__button) {
  cursor: pointer;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: #dfdfdf;
  border-radius: 50%;
}
:deep(.el-carousel__indicator.is-active button) {
  background: #ff2840;
}
.action-btn {
  outline: none;
  border: 0;
}

.customers_nav {
  text-align: center;
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box;
  margin-top: 80px;

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .slideshow {
    .paging {
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: #dfdfdf;
      border-radius: 50%;
    }
    .slick-active {
      .paging {
        background: #ff2840;
      }
    }

    .action-btn {
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      padding: 15px 44px;
      box-sizing: border-box;

      margin-top: 70px;
      background: #ff2840;
      border-radius: 4px;
    }
  }
}

.mobile-slideshow {
  display: none;
}

@media screen and (max-width: 880px) {
  .customers_nav{
    margin-top: 0;
  }
  :deep(.el-carousel__indicators) {
    margin-top: -30px;
    display: flex;
    justify-content: center;
    height: 30px;
    li {
      width: 20px;
    }
  }
 
  .customers {
    text-align: center;
    width: 100%;
    height: fit-content;
    padding: 20px 0 32px;
    box-sizing: border-box;

    h1 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 10px;
    }

   
  }
   .mobile-slideshow {
      display: block;

      .paging {
        cursor: pointer;
        display: inline-block;
        width: 8px;
        height: 8px;
        background: #dfdfdf;
        border-radius: 50%;
        margin-top: 24px;
      }
      .slick-active {
        .paging {
          background: #ff2840;
        }
      }

      .action-btn {
        cursor: pointer;
        color: #fff;
        font-size: 14px;
        padding: 12px 34px;
        box-sizing: border-box;

        margin-top: 50px;
        background: #ff2840;
        border-radius: 4px;
      }
    }

  .slideshow {
    display: none;
  }
}
</style>
