<template>
  <div class="erence_list">
    <h1>{{ t("promote_difference_title") }}</h1>
    <div class="erence_list_in">
      <div class="ce_list" v-for="item in partnerItem" :key="item.icon">
        <el-image :src="item.icon"  class="icon" lazy/>
        <h4>{{ item.title }}</h4>
        <span>{{ item.desc }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = userPomotionStore();

const mainStore = store.imageUrl;
let partnerItem = computed(() => {
  let list = [
    {
      title: t("promote_difference_item_title1"),
      desc: t("promote_difference_item_desc1"),
      icon: mainStore + "/promote/icon_huishuai.png",
    },
    {
      title: t("promote_difference_item_title2"),
      desc: t("promote_difference_item_desc2"),
      icon: mainStore + "/promote/icon_zhekou.png",
    },
    {
      title: t("promote_difference_item_title3"),
      desc: t("promote_difference_item_desc3"),
      icon: mainStore + "/promote/icon_fuwu.png",
    },
    {
      title: t("promote_difference_item_title4"),
      desc: t("promote_difference_item_desc4"),
      icon: mainStore + "/promote/icon_dashifuwu.png",
    },
  ];
  return list;
});
</script>
<style lang="scss" scoped>
$imageUrl: "https://cfstatic.hagoby.com/www/pic";
.erence_list {
  width: 100%;
  height: 600px;
  box-sizing: border-box;
  padding-top: 55px;
  box-sizing: border-box;

  background: url("#{$imageUrl}/promote/img_bg@2x.jpg") 100% no-repeat;
  background-size: 100% 100%;

  h1 {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 40px;
  }

  .erence_list_in {
    width: 1200px;
    margin: 0 auto;
    padding: 0 5px;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .ce_list {
      height: 210px;
      width: 500px;
      display: flex;
      flex-direction: column;

      .icon {
        width: 40px;
        height: 40px;
        margin-bottom: 16px;
      }

      h4 {
        font-size: 22px;
        font-weight: 700;
      }
    }
  }
}

@media screen and (max-width: 880px) {
  .erence_list {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    padding: 32px 20px 48px;
    box-sizing: border-box;

    background: url("#{$imageUrl}/promote/img_bg@2x.jpg") 100% no-repeat;
    background-size: 100% 100%;

    h1 {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .erence_list_in {
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .ce_list {
        width: auto;
        height: fit-content;
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;

        .icon {
          width: 40px;
          height: 40px;
          margin-bottom: 12px;
        }

        h4 {
          font-size: 16px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
