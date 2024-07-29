<template>
    <div>
      主页<br /><br />
      全局组件:
      <Pagination /><br />
      开关组件:
      <PlaneSwitch />
  
      <div class="language drop_down">
        <el-popover width="260" trigger="click" @show="showPopover" @hide="hidePopover" popper-class="ifFlagPopover"
          placement="bottom">
          <template #reference>
            <div class="reference_btn" :class="{ 'activeIsflag': !showPopoverIsflag }">
              <span class="iconfont icon-yuyan icon_top"></span>
              {{ t('select_language') }}
              <span class="iconfont icon_top_btn" :class="showPopoverIsflag ? 'icon-down' : 'icon-up'"></span>
            </div>
          </template>
          <div class="category_btn_cate">
            <div>语言</div>
            <el-checkbox-group v-model="checkList_status" @change="ChangeLanguage" class="gory_btn_bts">
              <el-checkbox size="small" border class="language_btn_in" v-for="item in langList" :key="item.category"
                :value="item.category">
                {{ item.lang }}
              </el-checkbox>
            </el-checkbox-group>
            <div class="confirm_true" @click="confirmLang">
              <span>{{ $t("confirm_ok_text") }}</span>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import PlaneSwitch from "@/components/PlaneSwitch/index.vue";
  import { langList } from "@/utils/langList";
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  const { t, locale } = useI18n();
  const router = useRouter();
  
  const checkList_status = ref<string[]>([]);
  const showPopoverIsflag = ref(false);
  
  const showPopover = () => {
    showPopoverIsflag.value = true;
  };
  
  const hidePopover = () => {
    showPopoverIsflag.value = false;
  };
  
  const ChangeLanguage = (val: any) => {
    if (checkList_status.value.length > 1) {
      checkList_status.value.splice(0, 1);
    }
  };
  
  const confirmLang = () => {
    const status_lang = checkList_status.value[0];
    locale.value = status_lang;
    localStorage.setItem('localLang', status_lang);
    router.go(0);
  };
  </script>
  <style lang="scss">
  .el-popper[x-placement^=bottom] {
    width: 300px !important;
  }
  </style>
  <style scoped lang="scss">
  .home-fixed {
    top: 0;
    width: 100%;
    background: #fff;
    position: fixed;
    left: 0;
    z-index: 999;
    box-shadow: 0px 3px 7px 0px rgba(70, 70, 70, 0.35);
    background: #fff;
    transition: all 0.4s;
  }
  
  .isHide {
    transition: all 0.4s;
  }
  
  :deep(.el-checkbox .el-checkbox__input .el-checkbox__inner) {
    display: none;
  }
  
  :deep(.el-checkbox--mini) {
    &:hover {
      color: #f03c51;
      border: 1px solid #f03c5123;
      background-color: #f5dadd6b;
    }
  }
  
  :deep(.el-checkbox-group .el-checkbox--mini) {
    padding: 0;
    width: 80px;
    height: 25px;
    padding: 5px 15px;
  }
  
  :deep(.el-checkbox__label) {
    padding-left: 0;
  
  }
  
  :deep(.el-checkbox.is-bordered+.el-checkbox.is-bordered) {
    margin-left: 0;
  }
  
  :deep(.is-checked) {
    border: 1px solid #f03c51;
    background-color: #f5dadd6b;
  
    .el-checkbox__label {
      color: #ff2840;
    }
  
    .el-checkbox__input {
      display: none;
    }
  }
  
  :deep(.el-checkbox.is-bordered.is-checked) {
    border-color: #ff2840;
  }
  
  :deep(.el-checkbox) {
    margin-right: 0;
  }
  
  .ifFlagPopover {
    display: flex;
  }
  
  .drop-down-top {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .help_center {
    width: 100px;
  }
  
  .a_icons {
    font-size: 14px;
    margin-left: 3px;
  }
  
  .activeIsflag {
    color: #ff2840;
  }
  
  .iconfont {
    margin-right: 5px;
    font-weight: 550;
  }
  
  .reference_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  
    &:hover {
      color: #ff2840;
    }
  }
  
  .references {
    display: flex;
    align-items: center;
    cursor: pointer;
  
    &:hover {
      color: #ff2840;
    }
  }
  
  .category_btn_cate {
    display: flex;
    flex-flow: column;
    width: 100%;
  
    .money_type {
      margin-top: 10px;
    }
  
    .gory_btn_bts {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 0;
      align-items: center;
  
      .language_btn_in {
        display: flex;
        width: 100px;
        height: 25px;
        font-size: 12px;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
      }
    }
  
    .gory_btn_bts>.language_btn_in:nth-child(even) {
      margin-left: 21px;
    }
  
    .gory_btn_bts>.language_btn_in:nth-child(odd) {
      margin-left: 8px;
    }
  
    .confirm_true {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-top: 20px;
  
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
        background-color: #ff2840;
        color: #fff;
        height: 30px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  
    .category_btn {
      display: flex;
      flex-wrap: wrap;
      min-width: 100px;
  
      .lang_btn {
        min-width: 100px;
        font-size: 12px;
        margin: 5px;
  
        &.active,
        &:hover {
          background-color: #ff2840;
          color: #fff;
          border: 1px solid #ff2840;
        }
      }
  
      .active {
        cursor: pointer;
        background-color: #ff2840;
        color: #ff2840;
        border: 1px solid #ff2840;
        color: #fff;
      }
    }
  }
  
  .lang_btn_comfirm {
    display: flex;
    margin: 10px auto;
    margin-bottom: -5px;
    align-items: center;
    justify-content: center;
    width: 200px;
    background-color: #ff2840;
    color: #fff;
    outline: none;
    border: 0;
  }
  
  .estimate {
    cursor: pointer;
    display: flex;
    align-items: center;
  
    &:hover {
      span {
        color: #ff2840;
      }
  
      .a_icons {
        color: #ff2840;
      }
    }
  }
  
  .icon_top {
    font-size: 28px;
    margin-right: 2px;
  }
  
  .icon_top_btn {
    font-size: 16px;
    margin-left: 3px;
  }
  
  .drop_down_icons {
    display: flex;
    align-items: center;
  }
  
  .linnes {
    margin: 0 10px;
    font-size: 20px;
    color: #999;
  }
  
  .logo_user {
    display: block;
    flex-shrink: 0;
    height: 40px;
    width: 40px;
  
    .img {
      display: block;
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
  }
  
  .lang_more {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 25px;
    color: #999;
    font-size: 10px;
    margin-top: 5px;
    margin-bottom: -5px;
  
    .icon_top_btn {
      font-size: 14px;
      margin-top: 2px;
    }
  }
  </style>
  