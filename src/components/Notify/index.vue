<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge
          :value="badgeValue"
          :max="badgeMax"
          :hidden="badgeValue === 0"
        >
          <el-tooltip
            effect="dark"
            :content="t('message_notification')"
            placement="bottom"
          >
            <el-icon :size="20" class="shake-hover">
              <Bell></Bell>
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane
            v-for="(item, index) in data"
            :name="item.name"
            :key="index"
          >
            <template #label>
              {{ item.name }}
              <el-badge
                :value="item.list.length"
                :max="badgeMax"
                :type="item.type"
              ></el-badge>
            </template>
            <el-scrollbar height="400px">
              <NotifyList :list="item.list"></NotifyList>
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <div class="notify-history">
          <el-button link @click="handleHistory">
            {{ t("button_view_history", { pageName: activeName }) }}
          </el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { Bell } from "@element-plus/icons-vue";
import NotifyList from "./NotifyList.vue";
import { type ListItem, notifyData, messageData, todoData } from "./data";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// 获取翻译后的字符串
const notificationsText = t("notifications");
const messagesText = t("messages");
const pendingText = t("pending");

// 定义 TabName 类型
type TabName =
  | typeof notificationsText
  | typeof messagesText
  | typeof pendingText;

interface DataItem {
  name: TabName;
  type: "primary" | "success" | "warning" | "danger" | "info";
  list: ListItem[];
}

/** 角标当前值 */
const badgeValue = computed(() => {
  return data.value.reduce((sum, item) => sum + item.list.length, 0);
});
/** 角标最大值 */
const badgeMax = 99;
/** 面板宽度 */
const popoverWidth = 350;
/** 当前 Tab */
const activeName = ref<TabName>(notificationsText);
/** 所有数据 */
const data = ref<DataItem[]>([
  // 通知数据
  {
    name: notificationsText,
    type: "primary",
    list: notifyData,
  },
  // 消息数据
  {
    name: messagesText,
    type: "danger",
    list: messageData,
  },
  // 待办数据
  {
    name: pendingText,
    type: "warning",
    list: todoData,
  },
]);

const handleHistory = () => {
  ElMessage.success(
    t("message_jump_to_history_page", { pageName: activeName.value }),
  );
};
</script>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
}

.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  20%,
  60% {
    transform: translateX(-3px);
  }
  40%,
  80% {
    transform: translateX(3px);
  }
}

.shake-hover:hover {
  animation: shake 0.5s ease-in-out;
}
</style>
