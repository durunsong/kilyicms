<template>
    <el-dropdown @command="quitOut">
        <span class="el-dropdown-link">
            <span v-if="userInfo">{{ t('hello') }}: {{ userInfo.userName }}</span>
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="a">{{ t('about') }}</el-dropdown-item>
                <el-dropdown-item command="m">{{ t('my_profile') }}</el-dropdown-item>
                <el-dropdown-item command="q">{{ t('log_out') }}</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, computed } from "vue"
import { useRouter } from "vue-router";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const store = userPomotionStore();
const userInfo = computed(() => store.userInfo);
const router = useRouter();

const quitOut = (command: string) => {
    switch (command) {
        case "a":
            ElMessage({
                message: t('failure_bypass'),
                type: "warning",
            });
            break;
        case "m":

            break;
        case "q":
            localStorage.removeItem("token");
            store.$reset();
            router.push("/login");
            break;
    }
};
</script>
<style lang="scss" scoped>
.el-dropdown-link {
    outline: none;
    cursor: pointer;
}
</style>