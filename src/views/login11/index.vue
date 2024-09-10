<template>
  <div class="login_container">
    <el-image :src="imgUrl" fit="cover" class="login_banner" />
    <el-card class="box_login_card" :class="isShow ? 'box_card_style' : ''">
      <h3 v-if="!isShow">{{ t("user_login") }}</h3>
      <h3 v-else>{{ t("user_register") }}</h3>
      <transition name="el-fade-in-linear">
        <el-form
          v-if="!isShow"
          :model="form"
          :rules="rules"
          class="login_form"
          ref="ref_form"
          @keyup.enter="onLoginConfirm"
        >
          <el-form-item prop="userName" :label="t('user_name')" label-width="80px">
            <el-input v-model.trim="form.userName" :placeholder="t('Please_enter_your_username')" size="large">
              <template #prepend>
                <el-icon :size="20">
                  <Avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="t('password')" label-width="80px">
            <el-input
              size="large"
              v-model.trim="form.password"
              show-password
              :placeholder="t('Please_enter_your_password')"
            >
              <template #prepend>
                <el-icon :size="20">
                  <Key />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <div class="slide_verify_right" v-if="sliderVisible">
            <SlideVerify @success="handleSlideSuccess" @close="sliderVisible = false" />
          </div>
          <el-form-item>
            <div class="button_side">
              <el-button class="submit_but" type="primary" @click="onLoginConfirm" :loading="loading">
                {{ t("login") }}
              </el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="toggle-form button_login_side">
              <el-button class="side_btn" link @click="toggleForm">{{ t("Go_to_Register") }}</el-button>
            </div>
          </el-form-item>
        </el-form>

        <el-form
          v-else
          :model="form"
          :rules="registerRules"
          class="register_form"
          ref="ref_form"
          @keyup.enter="onRegister"
        >
          <el-form-item prop="userName" :label="t('user_name')" label-width="80px">
            <el-input v-model.trim="form.userName" :placeholder="t('Please_enter_your_username')" size="large">
              <template #prepend>
                <el-icon :size="20">
                  <Avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="t('password')" label-width="80px">
            <el-input
              size="large"
              v-model.trim="form.password"
              show-password
              :placeholder="t('Please_confirm_the_password')"
            >
              <template #prepend>
                <el-icon :size="20">
                  <Key />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" :label="t('confirm_password')" label-width="80px">
            <el-input
              size="large"
              v-model.trim="form.confirmPassword"
              show-password
              :placeholder="t('Please_confirm_the_password')"
            >
              <template #prepend>
                <el-icon :size="20">
                  <Key />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="button_side">
              <el-button class="submit_but" type="primary" @click="onRegister" :loading="loading">
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
import { setToken } from "@/utils/cache/cookies";
import { ref, reactive, onMounted } from "vue";
import { loginApi, registerApi } from "@/service/index";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { userPomotionStore } from "@/store/modules/promotion";
import type { FormInstance, FormItemRule } from "element-plus";
import imgUrl from "@/assets/images/login_banner.gif";
import SlideVerify from "@/components/SlideVerify/index.vue";
import { useGreeting } from "@/hooks/useGreeting";
const sliderVisible = ref<boolean>(false); //滑动验证ui
const isSlider = ref<boolean>(false); // 是否开启验证
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface LoginForm {
  userName: string;
  password: string;
  confirmPassword?: string | undefined;
}

const loading = ref(false);
const router = useRouter();
const store = userPomotionStore();

const form = reactive<LoginForm>({
  userName: "",
  password: "",
  confirmPassword: undefined
});

const ref_form = ref<FormInstance | null>(null);
const isShow = ref(false);

onMounted(() => {
  console.log("Component mounted with form:", form);
});

const rules = {
  userName: [
    {
      required: true,
      message: t("Please_enter_your_username"),
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: t("Please_enter_your_password"),
      trigger: "blur"
    }
  ]
};

const registerRules = {
  userName: [
    {
      required: true,
      message: t("Please_enter_your_username"),
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: t("Please_enter_your_password"),
      trigger: "blur"
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: t("Please_confirm_the_password"),
      trigger: "blur"
    },
    {
      validator: (rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (value !== form.password) {
          callback(new Error(t("passwords_are_different")));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ]
};

// 图片验证码通过
const handleSlideSuccess = () => {
  setTimeout(() => {
    isSlider.value = true;
    sliderVisible.value = false;
    // 登录
    handlerExecutiveLogging();
  }, 1500);
};

// 登录接口请求验证
const handlerExecutiveLogging = () => {
  // 执行登录操作
  loading.value = true;
  const params = form;
  // 登录问候语
  const { showGreetingNotification } = useGreeting(t);
  loginApi(params)
    .then((res: any) => {
      if (res.status === 200) {
        // 显示问候语
        showGreetingNotification(res.message, res.userInfo.userName);
        // pinia存用户信息
        store.userInfo = res.userInfo;
        store.isCollapse = false;
        setToken(res.token);
        localStorage.setItem("token", res.token);
        router.push("/");
      } else if (res.status === 403) {
        ElNotification({
          message: res.message,
          type: "warning"
        });
      } else {
        ElNotification({
          message: res.message,
          type: "warning"
        });
      }
      loading.value = false;
    })
    .catch((error: Error) => {
      console.log("error", error);
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
          type: "success"
        });
        toggleForm(); // 登录和注册表单之间切换
      }
    })
    .catch(() => {
      loading.value = false;
    })
    .finally(() => {
      loading.value = false;
    });
};

const onRegister = () => {
  loading.value = true;
  ref_form.value?.validate((valid: boolean) => {
    if (valid) {
      handlerExecutiveRegister();
    }
  });
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
$sider_width: 420px;
$sider_height: 400px;

.login_container {
  @include onePlusFill;
  position: relative;

  .box_login_card {
    position: absolute;
    width: 400px;
    left: calc(50% - calc($sider_width / 3));
    top: calc(50% + calc($sider_height / 3));
    z-index: 22;
    background: linear-gradient(to bottom right, #ead6eec0, #a0f1eab5);
    padding-bottom: 30px;
    height: 300px;
  }

  .box_card_style {
    height: 320px;
  }
}

.login_banner {
  position: fixed;
  width: 100%;
  height: 100%;
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
  width: 230px;
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
