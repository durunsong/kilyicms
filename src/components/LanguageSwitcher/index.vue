<template>
  <div class="language drop_down">
    <el-popover
      width="260"
      transition="el-zoom-in-top"
      trigger="click"
      @show="showPopover"
      popper-class="ifFlagPopover"
      placement="bottom"
      v-model:visible="popoverVisible"
    >
      <template #reference>
        <div class="reference_btn">
          <SvgIcon name="select_lang" :aria-hidden="false"></SvgIcon>
          <span class="current_language">{{ current_language }}</span>
        </div>
      </template>
      <div class="category_btn_cate">
        <el-checkbox-group v-model="checkList_status" @change="ChangeLanguage" class="gory_btn_bts">
          <el-checkbox
            size="small"
            :border="true"
            class="language_btn_in"
            v-for="item in langList"
            :key="item.category"
            :value="item.category"
          >
            {{ item.lang }}
          </el-checkbox>
        </el-checkbox-group>
        <div class="confirm_true" @click="confirmLang">
          <span>{{ t("confirm_ok_text") }}</span>
        </div>
        <div class="cance_true" @click="cancelLang">
          <span>{{ t("confirm_cancel_text") }}</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { langList } from "@/utils/langList";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import CACHE_KEY from "@/constants/cache-key";
import { getLocalData, setLocalData } from "@/utils/cache/local-storage";

const { t, locale } = useI18n();
const router = useRouter();
const popoverVisible = ref(false);
const checkList_status = ref<string[]>([]);
const langue = computed<string>(() => {
  return getLocalData(CACHE_KEY.LOCAL_LANG) || "en";
});

// 去掉checkbox双击默认取消勾选事件
watch(
  checkList_status,
  (val, oldVal) => {
    if (val.length > 0) {
      checkList_status.value = val;
    } else {
      checkList_status.value = oldVal;
    }
  },
  { deep: true }
);

const current_language = computed(() => {
  return langList.find((el) => el.category === langue.value)?.lang || "English";
});

const cancelLang = () => {
  popoverVisible.value = false;
};

const showPopover = () => {
  checkList_status.value = [langue.value];
};

const ChangeLanguage = () => {
  if (checkList_status.value.length > 1) {
    checkList_status.value.splice(0, 1);
  }
};

const confirmLang = () => {
  const status_lang = checkList_status.value[0];
  locale.value = status_lang;
  setLocalData(CACHE_KEY.LOCAL_LANG, status_lang);
  router.go(0);
};
</script>

<style scoped lang="scss">
:deep(.el-checkbox .el-checkbox__input .el-checkbox__inner) {
  display: none;
}

:deep(.el-checkbox--mini) {
  &:hover {
    color: #1296db;
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

:deep(.el-checkbox.is-bordered + .el-checkbox.is-bordered) {
  margin-left: 0;
}

:deep(.is-checked) {
  border: 1px solid #1296db;
  background-color: #1296db;

  .el-checkbox__label {
    color: #ffffff;
  }

  .el-checkbox__input {
    display: none;
  }
}

:deep(.el-checkbox.is-bordered.is-checked) {
  border-color: #176ec5;
}

:deep(.el-checkbox) {
  margin-right: 0;
}

.ifFlagPopover {
  display: flex;
}

.reference_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: #1296db;
  }
}

.category_btn_cate {
  display: flex;
  flex-flow: column;
  width: 100%;

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

      &:hover {
        background-color: rgba(40, 167, 235, 0.87);
        color: #ffffff;
      }
    }
  }

  .gory_btn_bts > .language_btn_in:nth-child(even) {
    margin-left: 21px;
  }

  .gory_btn_bts > .language_btn_in:nth-child(odd) {
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
      background-color: #1296db;
      color: #fff;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #0e90aa;
      }
    }
  }

  .cance_true {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 220px;
      background-color: #eaeaea;
      color: #777;
      height: 30px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: #d6d6d6;
      }
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
        background-color: #1296db;
        color: #fff;
        border: 1px solid #1296db;
      }
    }

    .active {
      cursor: pointer;
      background-color: #1296db;
      color: #1296db;
      border: 1px solid #1296db;
      color: #fff;
    }
  }
}
/** 移动端适配 */
@media screen and (max-width: 880px) {
  .current_language {
    display: none;
  }
}
</style>
