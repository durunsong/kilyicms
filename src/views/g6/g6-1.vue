<template>
    <div class="login_container">
        <el-card shadow="hover" class="login_content">
            <h2 class="user_login_h2">账号登录</h2>
            <el-form :model="loginForm" ref="loginForm" label-width="0">
                <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user"
                        size="large" />
                </el-form-item>
                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"
                        prefix-icon="el-icon-lock" size="large" />
                </el-form-item>
                <el-form-item>
                    <el-button class="login_btn_con" type="primary" @click="handleLogin" size="large">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-button class="btns" type="warning" round @click="forgotPassword">忘记密码</el-button>
        <el-button class="btns register" type="info" round @click="register">注册</el-button>
    </div>
</template>



<script lang="ts" setup>
import { reactive, ref } from 'vue';

const loginForm = reactive({
    username: '',
    password: ''
});

const loginFormRef = ref(null);

const handleLogin = () => {
    loginFormRef.value?.validate((valid: boolean) => {
        if (valid) {
            console.log('Logging in with:', loginForm);
        } else {
            console.log('Please fill out the form correctly.');
        }
    });
};

const forgotPassword = () => {
    console.log('Forgot Password clicked');
};

const register = () => {
    console.log('Register clicked');
};


</script>

<style scoped lang="scss">
.login_container  {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 150px auto;
    width: 470px;
}

.login_content {
    width: 380px;
    padding: 70px 20px;
    box-shadow: inset 20px 20px 20px rgba(0, 0, 0, 0.05),
        25px 35px 20px rgba(0, 0, 0, 0.05), 25px 30px 30px rgba(0, 0, 0, 0.05),
        inset -20px -20px 25px rgba(255, 255, 255, 0.9);
    border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
    transition: 0.5s;

    &:hover {
        border-radius: 50%;
    }
}

.user_login_h2 {
    margin-left: 30px;
    margin-bottom: 20px;
}
.login_btn_con{
    margin-left: 30px;
    margin-top: 20px;
    height: 42px;
    width: 150px;
    font-weight: 550;
    font-size: 16px;
}

.btns {
    position: absolute;
    right: -60px;
    bottom: 0;
    width: 120px;
    height: 120px;
    background: #c61dff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #fff;
    font-size: 14px;
    border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
    box-shadow: inset 10px 10px 10px rgba(224, 216, 227, 0.05),
        15px 25px 10px rgba(160, 149, 164, 0.1), 15px 20px 20px rgba(95, 85, 99, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
    transition: 0.25s;

    &:hover {
        border-radius: 50%;
    }
}

.register {
    bottom: 150px;
    right: -50px;
    width: 80px;
    height: 80px;
    background: #01b4ff;
    border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
    box-shadow: inset 10px 10px 10px rgba(178, 188, 192, 0.05),
        15px 25px 10px rgba(103, 112, 116, 0.1), 15px 20px 20px rgba(92, 103, 108, 0.1),
        inset -10px -10px 15px rgba(255, 255, 255, 0.5);
}
</style>