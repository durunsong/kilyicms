<template>
  <div class="conter">
    <el-card class="box-card">
      <transition name="el-fade-in-linear">
        <el-form :model="form" :rules="rules" v-show="!isShow" class="login_form" ref="ref_form" :inline="false"
          @keyup.enter="onSubmit">
          <el-form-item prop="userName" label="用户名" label-width="80px">
            <el-input v-model.trim="form.userName" placeholder="请输入用户名" size="large">
              <template #prepend>
                <el-icon :size="20">
                  <Avatar />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码" label-width="80px">
            <el-input size="large" v-model.trim="form.password" show-password placeholder="请输入密码">
              <template #prepend>
                <el-icon :size="20">
                  <Key />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="button_side">
              <el-button class="submit_but" type="primary" @click="onSubmit" :loading="loading">
                登录
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </transition>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { loginApi } from "@/service/index";
import { Avatar, Key } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { userPomotionStore } from "@/store";
import type { FormInstance } from "element-plus";

interface LoginForm {
  userName: string;
  password: string;
}

const loading = ref(false);
const router = useRouter();
const store = userPomotionStore();

const form = reactive<LoginForm>({
  userName: "admin",
  password: "123456",
});

const ref_form = ref<FormInstance | null>(null);
const isShow = ref(false);

onMounted(() => {
  console.log("Component mounted with form:", form);
});

const rules = {
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const onSubmit = () => {
  loading.value = true;
  ref_form.value?.validate((valid: boolean) => {
    if (valid) {
      const params = form;
      loginApi(params)
        .then((res:any) => {
          console.log("88888---", res);
          if (res.status === 200) {
            ElMessage({
              message: res.message,
              type: "success",
            });
            // pinia存用户信息
            store.userInfo = res.data;
            store.isCollapse = false;
            localStorage.setItem("token", res.data.token);
            router.push("/home");
          } else if (res.status === 403) {
            ElMessage({
              message: res.message,
              type: "warning",
            });
          } else {
            ElMessage({
              message: res.message,
              type: "warning",
            });
          }
          loading.value = false;
        })
        .catch((error: Error) => {
          console.log("error", error);
          loading.value = false;
        });
    } else {
      loading.value = false;
      return;
    }
  });
};
</script>



<style lang="scss" scoped>
@import "../../assets/style/mixin.scss";
$sider_width: 400px;
$sider_height: 280px;

.conter {
  @include onePlusFill;
  position: relative;

  .box-card {
    position: absolute;
    @include common-style;
    left: calc(50% - calc($sider_width / 2));
    top: calc(50% + calc($sider_height /1.2));
    z-index: 22;
    background: linear-gradient(to bottom right, #ead6ee, #a0f1ea);
  }
}

.login_form {
  margin-top: 30px;

  .button_side {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    .submit_but {
      width: 50%;
    }
  }

  :deep(.el-input-group__prepend) {
    padding: 0 10px;
  }
}

:deep(.el-input) {
  width: 230px;
}
</style>
