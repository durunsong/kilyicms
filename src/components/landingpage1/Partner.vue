<template>
  <div class="partner_nav">
    <h1>{{ $t("promote_partner") }}</h1>
    <div class="partner-icon-box">
      <el-image
        v-for="item in partnerItem"
        :src="item.icon"
        :key="item.icon"
        lazy
        class="icon"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = userPomotionStore();

const mainStore = store.imageUrl;
let partnerItem = computed(() => {
  let list = [
    {
      icon: mainStore + "/promote/icon_dhl.png",
    },
    {
      icon: mainStore + "/promote/icon_fedex.png",
    },
    {
      icon: mainStore + "/promote/icon_ups.png",
    },
    {
      icon: mainStore + "/promote/icon_t-l-chargement.png",
    },
    {
      icon: mainStore + "/promote/icon_chargement.png",
    },
  ];
  return list;
});
</script>
<style lang="scss" scoped>
$imageUrl:'https://cfstatic.hagoby.com/www/pic';

.partner_nav {
  text-align: center;
  width: 100%;
  padding: 40px 0;
  box-sizing: border-box;


  h1 {
    font-size: 32px;
    font-weight: 700;
    margin-bottom: 70px;
  }

  .partner-icon-box {
    width: 1190px;
    margin: 0 auto;
    padding: 0 5px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

@media screen and (max-width: 880px) {
  .partner_nav {
    text-align: center;
    width: 100%;
    padding: 20px 0;
    box-sizing: border-box;


    h1 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    .partner-icon-box {
      background: url("#{$imageUrl}/promote/partner_logo.png") 100% no-repeat;
      background-size: 100% 100%;
      width: 330px;
      height: 40px;

      .icon {
        display: none;
      }
    }
  }
}
</style>
