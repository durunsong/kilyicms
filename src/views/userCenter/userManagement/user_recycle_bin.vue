<template>
  <div class="search_container">
    <el-input
      class="search_input"
      v-model.trim="searchKeyword"
      :placeholder="t('please_enter')"
      @keyup.enter="handleSearchItems"
      clearable
      @clear="handleClearIpt"
    ></el-input>
    <div class="date_time_picker">
      <el-date-picker
        v-model="pickerData"
        type="datetimerange"
        :start-placeholder="t('start_time')"
        :end-placeholder="t('end_time')"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY-MM-DD"
        @change="formatHandleChange"
      ></el-date-picker>
    </div>
    <el-button
      class="search_btn"
      type="default"
      @click="handleClearItems"
      icon="Delete"
      >{{ t("clear") }}</el-button
    >
    <el-button
      class="search_btn"
      type="primary"
      @click="debouncedHandleSearchItems"
      icon="Search"
      >{{ t("search") }}</el-button
    >
  </div>
  <el-table :data="userList" style="width: 100%">
    <el-table-column :label="t('serial_number')" width="100">
      <template #default="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column :label="t('name')" align="center">
      <template #default="scope">
        <span v-html="highlightKeyword(scope.row.userName)"></span>
      </template>
    </el-table-column>
    <el-table-column
      prop="create_time"
      :label="t('create_time')"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="update_time"
      :label="t('update_time')"
      align="center"
    ></el-table-column>
    <el-table-column :label="t('operates')" align="center">
      <template #default="scope">
        <el-popconfirm
          width="230"
          cancel-button-type="default"
          :confirm-button-text="t('confirm_ok_text')"
          :cancel-button-text="t('confirm_cancel_text')"
          icon="Warning"
          icon-color="#409eff"
          :title="t('sure_Restore')"
          @confirm="handleRestore(scope.row.id)"
        >
          <template #reference>
            <el-button>{{ t("restore") }}</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm
          width="230"
          cancel-button-type="default"
          :confirm-button-text="t('confirm_ok_text')"
          :cancel-button-text="t('confirm_cancel_text')"
          icon="Warning"
          icon-color="rgb(238, 44, 44)"
          :title="t('shift_delete')"
          @confirm="deleteItem(scope.row.id)"
        >
          <template #reference>
            <el-button type="danger">{{ t("delete") }}</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="prev, pager, next, jumper"
      :total="total"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import {
  getDeleteUserItemApi,
  deleteItemSiftApi,
  restoreUserApi,
} from "@/service/user";
import useMomentFormat from "@/hooks/useMomentFormat";
import { useDebounce } from "@/hooks/useDebounce";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

interface ListItem {
  id: number;
  userName: string;
  description: string;
  password: string;
}

const pickerData = ref<[Date, Date] | undefined>(undefined);
const userList = ref<ListItem[]>([]);
const total = ref<number>(0);
const searchKeyword = ref<string>("");

const queryParams = reactive({
  pageNum: 1,
  pageSize: 7,
  startTime: null as string | null,
  endTime: null as string | null,
  keywords: null as string | null,
});

// 还原用户
const handleRestore = async (id: number) => {
  try {
    const response = await restoreUserApi(id);
    if (response.status === 200) {
      fetchItems();
      ElMessage.success(t("Restore_successfully"));
    } else {
      ElMessage.error(t("Restore_failure"));
    }
  } catch {
    ElMessage.error(t("Restore_failure"));
  }
};

const formatHandleChange = (value: [Date, Date] | null) => {
  if (value) {
    queryParams.startTime = useMomentFormat(value[0]?.toISOString() || "");
    queryParams.endTime = useMomentFormat(value[1]?.toISOString() || "");
  } else {
    queryParams.startTime = null;
    queryParams.endTime = null;
  }
};

// 清空
const handleClearItems = () => {
  if (pickerData.value || searchKeyword.value) {
    pickerData.value = undefined;
    formatHandleChange(null);
    handleClearIpt();
    ElMessage.success(t("Clear_successfully"));
  }
};

// 高亮关键词
const highlightKeyword = (text: string) => {
  if (!searchKeyword.value) return text;
  const pattern = new RegExp(`(${searchKeyword.value})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
};

watch(searchKeyword, (newValue) => {
  if (newValue === "") {
    queryParams.keywords = null;
  } else {
    queryParams.keywords = newValue;
  }
});

// 获取数据
const fetchItems = async () => {
  try {
    const response: any = await getDeleteUserItemApi(queryParams);
    userList.value = response.data;
    total.value = response.total;
  } catch {
    ElMessage.error(t("Data_acquisition_failure"));
  }
};

// 彻底删除
const deleteItem = async (id: number) => {
  try {
    const response = await deleteItemSiftApi(id);
    if (response.status === 200) {
      fetchItems();
      ElMessage.success(t("successfully_delete"));
    } else {
      ElMessage.error(t("fail_to_delete"));
    }
  } catch {
    ElMessage.error(t("fail_to_delete"));
  }
};

// 搜索
const handleSearchItems = () => {
  // 搜索非空防抖
  if (pickerData.value || searchKeyword.value) {
    queryParams.pageNum = 1;
    fetchItems();
  }
};

//   -----搜索防抖2秒一次-----
const debouncedHandleSearchItems = useDebounce(handleSearchItems, 2000, true);

const handleClearIpt = () => {
  searchKeyword.value = "";
  queryParams.keywords = null;
  queryParams.pageNum = 1;
  fetchItems();
};

const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  queryParams.pageNum = 1;
  fetchItems();
};

const handleCurrentChange = (val: number) => {
  queryParams.pageNum = val;
  fetchItems();
};

onMounted(() => {
  fetchItems();
});
</script>

<style>
/* 高亮显示样式 */
.highlight {
  color: #409eff;
  background-color: #5695d532;
}
</style>

<style lang="scss" scoped>
:deep(.el-date-editor) {
  height: 41px;
}

:deep(.el-table__header) {
  background-color: #eaeaea;
}

.search_container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .date_time_picker {
    width: 450px;
  }

  .search_input {
    width: 250px;
    height: 42px;
    margin-right: 15px;
  }

  .search_btn {
    height: 41px;
    width: 100px;
  }
}

.dialog-footer {
  text-align: right;
}

.pagination {
  margin-top: 10px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
</style>
