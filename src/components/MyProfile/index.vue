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

    <el-dialog :title="t('editorial_staff')" v-model="showEditDialog">
        <el-form :model="editItemData">
            <el-form-item label="头像">
                <el-avatar :size="50" class="avatar_img" :src="imageList"></el-avatar>
            </el-form-item>
            <el-form-item label="默认语言">
                <el-select v-model="checkList_status[0]" placeholder="选择语言" style="width: 240px">
                    <el-option v-for="item in langList" :key="item.category" :label="item.lang"
                        :value="item.category" />
                </el-select>
            </el-form-item>
            <el-form-item :label="t('name')">
                <el-input v-model="editItemData.userName"></el-input>
            </el-form-item>
            <el-form-item :label="t('description')">
                <el-input v-model="editItemData.description"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showEditDialog = false">{{ t('confirm_cancel_text') }}</el-button>
            <el-button type="primary" @click="updateItem">{{ t('update') }}</el-button>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router";
import { userPomotionStore } from "@/store";
import { useI18n } from "vue-i18n";
import { langList } from "@/utils/langList";
const { t } = useI18n();
const store = userPomotionStore();
const userInfo = computed(() => store.userInfo);
const router = useRouter();
const showEditDialog = ref(false)
const checkList_status = ref<string[]>([]);
const editItemData = ref({
    userName: "",
    description: "",
})
// 去掉checkbox双击默认取消勾选事件
watch(checkList_status, (val, oldVal) => {
    if (val.length > 0) {
        checkList_status.value = val;
    } else {
        checkList_status.value = oldVal;
    }
}, { deep: true });
const showPopover = () => {
    checkList_status.value = [langue.value];
};

const ChangeLanguage = () => {
    if (checkList_status.value.length > 1) {
        checkList_status.value.splice(0, 1);
    }
};

const langue = computed(() => {
    return localStorage.getItem('localLang') || 'en';
});
const current_language = computed(() => {
    return langList.find((el) => el.category === langue.value)?.lang ||
        "English"
});

const imageList = computed(() => store.userInfo.avatar);

const updateItem = () => {
    console.log('edit');

}

const quitOut = (command: string) => {
    switch (command) {
        case "a":
            ElMessage({
                message: t('failure_bypass'),
                type: "warning",
            });
            break;
        case "m":
            showEditDialog.value = true
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