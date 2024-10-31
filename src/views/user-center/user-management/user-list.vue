<template>
  <div class="search_container">
    <el-input
      class="search_input"
      v-model.trim="searchKeyword"
      :placeholder="t('please_enter') + '↵'"
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
  <el-button class="add_btn" type="primary" @click="showAddDialog = true">
    {{ t("Add_personnel") }}
  </el-button>
  <el-table
    :data="userList"
    :header-cell-style="{ background: '#d9ece9', color: '#666' }"
  >
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
        <el-button @click="editItem(scope.row)">{{ t("edit") }}</el-button>
        <el-button type="danger" @click="deleteItem(scope.row.id)">{{
          t("delete")
        }}</el-button>
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
  <!-- add dialog -->
  <el-dialog :title="t('Add_personnel')" v-model="showAddDialog">
    <el-form :model="newItem">
      <el-form-item :label="t('Account_name')">
        <el-input v-model="newItem.userName"></el-input>
      </el-form-item>
      <el-form-item :label="t('password')">
        <el-input
          v-model="newItem.password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('character')">
        <el-select
          v-model="newItem.roles"
          :placeholder="t('Selecting_a_Character')"
        >
          <el-option label="Admin" value="admin"></el-option>
          <el-option label="User" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('description')">
        <el-input v-model="newItem.description"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="showAddDialog = false">{{
          t("confirm_cancel_text")
        }}</el-button>
        <el-button type="primary" @click="addItem">{{ t("add") }}</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- edit dialog -->
  <el-dialog :title="t('editorial_staff')" v-model="showEditDialog">
    <el-form :model="editItemData">
      <el-form-item :label="t('name')">
        <el-input v-model="editItemData.userName"></el-input>
      </el-form-item>
      <el-form-item :label="t('password')">
        <el-input
          v-model="editItemData.password"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="t('roles')">
        <el-select
          v-model="editItemData.roles"
          :placeholder="t('Selecting_a_Character')"
        >
          <el-option label="Admin" value="admin"></el-option>
          <el-option label="User" value="user"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="t('description')">
        <el-input v-model="editItemData.description"></el-input>
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <div class="dialog-footer">
        <el-button @click="showEditDialog = false">{{
          t("confirm_cancel_text")
        }}</el-button>
        <el-button type="primary" @click="updateItem">{{
          t("update")
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import {
  getItemApi,
  addItemApi,
  updateItemApi,
  deleteItemApi,
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
  roles: string;
}

const pickerData = ref<[Date, Date] | undefined>(undefined);
const userList = ref<ListItem[]>([]);
const total = ref<number>(0);
const searchKeyword = ref<string>("");
const showAddDialog = ref<boolean>(false);
const showEditDialog = ref<boolean>(false);
const newItem = ref<Omit<ListItem, "id">>({
  userName: "",
  description: "",
  password: "",
  roles: "",
});

const editItemData = ref<Omit<ListItem, "id">>({
  userName: "",
  description: "",
  password: "",
  roles: "",
});
const editingItemId = ref<number | null>(null);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 7,
  startTime: null as string | null,
  endTime: null as string | null,
  keywords: null as string | null,
});

// 高亮关键词
const highlightKeyword = (text: string) => {
  if (!searchKeyword.value) return text;
  const pattern = new RegExp(`(${searchKeyword.value})`, "gi");
  return text.replace(pattern, '<span class="highlight">$1</span>');
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
    const response: any = await getItemApi(queryParams);
    userList.value = response.data;
    total.value = response.total;
  } catch {
    ElMessage.error(t("Data_acquisition_failure"));
  }
};

// 新增
const addItem = async () => {
  try {
    const addData: any = { ...newItem.value, id: userList.value.length + 1 };
    addData.roles = [addData.roles];
    const response: any = await addItemApi(addData);
    if (response.status == 200) {
      showAddDialog.value = false;
      newItem.value.userName = "";
      newItem.value.password = "";
      newItem.value.description = "";
      newItem.value.roles = "";
      ElMessage.success(t("Add_successful"));
      fetchItems();
    } else {
      ElMessage.error(response.message);
    }
  } catch {
    ElMessage.error(t("fail_to_add"));
  }
};

// 编辑按钮
const editItem = (item: ListItem) => {
  editingItemId.value = item.id;
  editItemData.value.userName = item.userName;
  editItemData.value.password = item.password;
  editItemData.value.description = item.description;
  editItemData.value.description = item.description;
  editItemData.value.roles = item.roles[0];
  showEditDialog.value = true;
};
// 编辑内容
const updateItem = async () => {
  try {
    if (editingItemId.value !== null) {
      const editData: any = {
        ...editItemData.value,
      };
      editData.roles = [editData.roles];
      const response: any = await updateItemApi(editingItemId.value, editData);
      if (response.status === 200) {
        fetchItems();
        showEditDialog.value = false;
        ElMessage.success(t("update_successfully"));
      } else {
        ElMessage.error(response.message || t("Update_failure"));
      }
    }
  } catch {
    ElMessage.error(t("Update_failure"));
  }
};

// 删除
const deleteItem = async (id: number) => {
  try {
    const response = await deleteItemApi(id);
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
.search_container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .date_time_picker {
    max-width: 440px;
  }

  .search_input {
    width: 250px;
    margin-right: 15px;
  }

  .search_btn {
    margin-left: 10px;
    width: 100px;
  }
}

.dialog-footer {
  text-align: right;
}

.add_btn {
  width: fit-content;
  margin-top: 10px;
  margin-bottom: 20px;
}

.pagination {
  margin-top: 10px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}
</style>
