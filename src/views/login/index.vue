<template>
  <div class="login_container">
    <div class="theme-switch-container">
      <LanguageSwitcher></LanguageSwitcher>
      <ThemeSwitch class="theme-switch"></ThemeSwitch>
    </div>
    <el-card class="box_login_card" :class="isShow ? 'box_card_style' : ''">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <h3 v-if="!isShow">
        {{ t("user_login") }}
        <!-- 演示账号 -->
        <span style="font-weight: normal; color: #999; font-size: 14px"
          >演示账号</span
        >
        <el-radio-group
          v-if="!isShow"
          v-model="switchRoles"
          @change="handleChangeRole"
        >
          <el-radio-button label="admin" value="admin"></el-radio-button>
          <el-radio-button label="user" value="user"></el-radio-button>
        </el-radio-group>
      </h3>
      <h3 v-else>{{ t("user_register") }}</h3>
      <transition name="el-fade-in-linear">
        <!-- 登录 -->
        <el-form
          v-if="!isShow"
          :model="form"
          :rules="loginRules"
          class="login_form"
          ref="ref_form"
          @keyup.enter="onLoginConfirm"
        >
          <el-form-item
            prop="userName"
            :label="t('user_name')"
            label-width="100px"
          >
            <el-input
              v-model.trim="form.userName"
              :placeholder="t('Please_enter_your_username')"
              size="large"
              :prefix-icon="User"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :label="t('password')"
            label-width="100px"
          >
            <el-input
              size="large"
              v-model.trim="form.password"
              show-password
              :placeholder="t('Please_enter_your_password')"
              :prefix-icon="Lock"
            >
            </el-input>
          </el-form-item>
          <div class="slide_verify_right" v-if="sliderVisible">
            <SlideVerify
              @success="handleSlideSuccess"
              @close="sliderVisible = false"
            ></SlideVerify>
          </div>
          <el-form-item>
            <div class="button_side">
              <el-button
                class="submit_but"
                type="primary"
                @click="onLoginConfirm"
                :loading="loading"
              >
                {{ t("login") }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="toggle-form button_login_side">
              <el-button class="side_btn" link @click="toggleForm">{{
                t("Go_to_Register")
              }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <!-- 注册 -->
        <el-form
          v-else
          :model="form"
          :rules="registerRules"
          class="register_form"
          ref="ref_form"
          @keyup.enter="onRegister"
        >
          <el-form-item
            prop="userName"
            :label="t('user_name')"
            label-width="100px"
          >
            <el-input
              v-model.trim="form.userName"
              :placeholder="t('Please_enter_your_username')"
              size="large"
              :prefix-icon="User"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :label="t('password')"
            label-width="100px"
          >
            <el-input
              size="large"
              v-model.trim="form.password"
              show-password
              :placeholder="t('Please_confirm_the_password')"
              :prefix-icon="Lock"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            prop="confirmPassword"
            :label="t('confirm_password')"
            label-width="100px"
          >
            <el-input
              size="large"
              v-model.trim="form.confirmPassword"
              show-password
              :placeholder="t('Please_confirm_the_password')"
              :prefix-icon="Lock"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="button_side">
              <el-button
                class="submit_but"
                type="primary"
                @click="onRegister"
                :loading="loading"
              >
                {{ t("router_register") }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="toggle-form button_register_side">
              <el-button class="side_btn" link @click="toggleForm">
                {{ t("Go_and_log_in") }}
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </transition>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from "@/components/ThemeSwitch/index.vue";
import { ref, reactive } from "vue";
import { registerApi } from "@/service/login";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import SlideVerify from "@/components/SlideVerify/index.vue";
import { InternalRuleItem, Values, ValidateOption } from "async-validator";
import { User, Lock } from "@element-plus/icons-vue";
import LanguageSwitcher from "@/components/LanguageSwitcher/index.vue";
import { useUserStore } from "@/store/modules/user";
import { setLocalData } from "@/utils/cache/local-storage";
import CACHE_KEY from "@/constants/cache-key";
const sliderVisible = ref<boolean>(false); //滑动验证ui
const isSlider = ref<boolean>(false); // 是否开启验证
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface LoginForm {
  userName: string;
  password: string;
  confirmPassword?: string | undefined;
}

const loading = ref<boolean>(false);
const router = useRouter();
const form = reactive<LoginForm>({
  userName: "admin",
  password: "123456",
  confirmPassword: undefined,
});
const switchRoles = ref<string>("admin");

const ref_form = ref<FormInstance | null>(null);
const isShow = ref<boolean>(false);

const loginRules = {
  userName: [
    {
      required: true,
      message: t("Please_enter_your_username"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("Please_enter_your_password"),
      trigger: "blur",
    },
  ],
};

const registerRules: FormRules = {
  userName: [
    {
      required: true,
      message: t("Please_enter_your_username"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("Please_enter_your_password"),
      trigger: "blur",
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: t("Please_confirm_the_password"),
      trigger: "blur",
    },
    {
      validator: (
        rule: InternalRuleItem,
        value: string,
        callback: (error?: string | Error) => void,
        _source: Values,
        _options: ValidateOption,
      ) => {
        if (value !== form.password) {
          callback(new Error(t("passwords_are_different")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 演示账号切换
const handleChangeRole = (role: string | number | boolean | undefined) => {
  if (role === "admin") {
    Object.assign(form, {
      userName: "admin",
      password: "123456",
      confirmPassword: undefined,
    });
  } else {
    Object.assign(form, {
      userName: "user",
      password: "123456",
      confirmPassword: undefined,
    });
  }
};

// 图片验证码通过
const handleSlideSuccess = () => {
  setTimeout(() => {
    isSlider.value = true;
    sliderVisible.value = false;
    // 登录
    handlerExecutiveLogging();
  }, 1000);
};

// 登录接口请求验证
const handlerExecutiveLogging = () => {
  // 执行登录操作
  loading.value = true;
  const params = form;
  useUserStore()
    .login(params)
    .then(() => {
      // 登录成功notify标记
      setLocalData(CACHE_KEY.IS_LOGIN_KEY, true);
      router.push("/");
    })
    .finally(() => {
      loading.value = false;
    });
};

// 图形验证弹窗
const onLoginConfirm = () => {
  ref_form.value?.validate((valid: boolean) => {
    if (valid) {
      if (isSlider.value) {
        // 登录
        handlerExecutiveLogging();
      } else {
        sliderVisible.value = true;
      }
    } else {
      loading.value = false;
    }
  });
};

const toggleForm = () => {
  isShow.value = !isShow.value;
  isSlider.value = false;
};

// 注册接口验证
const handlerExecutiveRegister = () => {
  loading.value = true;
  registerApi(form)
    .then((res: any) => {
      if (res.status === 200) {
        ElNotification({
          message: res.message,
          type: "success",
        });
        toggleForm(); // 登录和注册表单之间切换
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

const onRegister = () => {
  // loading.value = true;
  ref_form.value?.validate((valid: boolean) => {
    if (valid) {
      handlerExecutiveRegister();
    }
  });
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .theme-switch-container {
    position: absolute;
    top: 30px;
    right: 50px;
    display: flex;

    .theme-switch {
      margin-left: 10px;
      cursor: pointer;
    }
  }

  .box_login_card {
    height: 480px;
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    box-sizing: border-box;

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;

      img {
        height: 100%;
      }
    }
  }

  .box_card_style {
    height: 535px;
  }
}

.login_form,
.register_form {
  margin-top: 30px;

  .button_side {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .submit_but {
      width: 55%;
    }
  }

  :deep(.el-input-group__prepend) {
    padding: 0 10px;
  }
}

:deep(.el-input) {
  width: 280px;
}

:deep(.el-form-item__label) {
  color: #333;
}

.toggle-form {
  display: flex;
  justify-content: center;
}

.side_btn {
  color: #111;

  &:hover {
    color: #555;
  }
}

.button_register_side {
  margin-top: 20px;
}

.button_login_side {
  margin-top: 20px;
}
</style>
