<template>
  <div class="advantage">
    <h1>{{ t("promote_advantage_title") }}</h1>
    <div class="advantage-list">
      <div class="list-item" v-for="item in advantageItem" :key="item.icon">
        <el-image class="icon" lazy :src="item.icon" />
        <h4 class="item-title">{{ item.title }}</h4>
        <span>{{ item.desc }}</span>
      </div>
    </div>
    <button class="action-btn" @click="signUp">
      {{ t("promote_sign_up_btn") }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["signUp"]);

function signUp() {
  emit("signUp");
}
const { t } = useI18n();
const mainStore = userPomotionStore().imageUrl;
const advantageItem = computed(() => {
  return [
    {
      title: t("promote_advantage_item_title1"),
      desc: t("promote_advantage_item_desc1"),
      icon: mainStore + "/promote/icon_1.png",
    },
    {
      title: t("promote_advantage_item_title2"),
      desc: t("promote_advantage_item_desc2"),
      icon: mainStore + "/promote/icon_2.png",
    },
    {
      title: t("promote_advantage_item_title3"),
      desc: t("promote_advantage_item_desc3"),
      icon: mainStore + "/promote/icon_3.png",
    },
    {
      title: t("promote_advantage_item_title4"),
      desc: t("promote_advantage_item_desc4"),
      icon: mainStore + "/promote/icon_4.png",
    },
    {
      title: t("promote_advantage_item_title5"),
      desc: t("promote_advantage_item_desc5"),
      icon: mainStore + "/promote/icon_5.png",
    },
    {
      title: t("promote_advantage_item_title6"),
      desc: t("promote_advantage_item_desc6"),
      icon: mainStore + "/promote/icon_6.png",
    },
  ];
});
</script>

<style lang="scss" scoped>
$imageUrl:'https://cfstatic.hagoby.com/www/pic';
.action-btn {
  border: 0 !important;
  outline: none !important;
}

.advantage {
  text-align: center;
  width: 100%;
  height: 940px;
  background: rgba(255, 139, 152, 0.08);
  padding: 60px 0;
  box-sizing: border-box;


  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 80px;
  }

  .advantage-list {
    width: 1190px;
    margin: 0 auto;
    padding: 0 5px;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .list-item {
      width: 300px;
      height: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 100px;
        height: 100px;
        margin-bottom: 12px;
      }

      .item-title {
        font-weight: 700;
        font-size: 20px;
      }
    }
  }

  .action-btn {
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;

    padding: 15px 44px;
    background: #ff2840;
    border-radius: 4px;
  }
}

@media screen and (max-width: 880px) {
  .advantage {
    text-align: center;
    width: 100%;
    height: fit-content;
    background: rgba(255, 139, 152, 0.08);
    padding: 20px 24px 30px;
    box-sizing: border-box;


    h1 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 30px;
    }

    .advantage-list {
      width: 100%;
      padding: 0;
      box-sizing: border-box;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .list-item {
        width: 48%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;

        .icon {
          width: 50px;
          height: 50px;
          margin-bottom: 12px;
        }

        .item-title {
          font-weight: 700;
          font-size: 14px;
        }

        span {
          font-size: 10px;
        }
      }
    }

    .action-btn {
      cursor: pointer;
      color: #fff;
      font-size: 16px;
      padding: 15px 44px;
      box-sizing: border-box;

      background: #ff2840;
      border-radius: 4px;
      margin-top: 20px;
    }
  }
}
</style>
