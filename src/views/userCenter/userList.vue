<template>
  <div>
    <div class="search_container">
      <el-input class="search_input" v-model.trim="searchKeyword" placeholder="请输入搜索关键字" @keyup.enter="handleSearchItems"
        clearable @clear="handleclearIpt" />
      <div class="date_time_picker">
        <el-date-picker v-model="pickerDatas" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
          format="YYYY-MM-DD HH:mm:ss" date-format="YYYY-MM-DD" @change="formatHandleChange"/>
      </div>
      <el-button class="search_btn" type="default" @click="handleClearItems" icon="Delete">清除</el-button>
      <el-button class="search_btn" type="primary" @click="debouncedHandleSearchItems" icon="Search">搜索</el-button>
    </div>
    <el-button class="add_btn" type="primary" @click="showAddDialog = true">添加项目</el-button>
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="update_time" label="更新时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="editItem(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper" :total="total" :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize" />
    </div>

    <!-- 添加项目的对话框 -->
    <el-dialog title="添加项目" v-model="showAddDialog">
      <el-form :model="newItem">
        <el-form-item label="账号名称">
          <el-input v-model="newItem.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newItem.password"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="newItem.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="addItem">添加</el-button>
      </div>
    </el-dialog>

    <!-- 编辑项目的对话框 -->
    <el-dialog title="编辑项目" v-model="showEditDialog">
      <el-form :model="editItemData">
        <el-form-item label="名称">
          <el-input v-model="editItemData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editItemData.password"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editItemData.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="updateItem">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getListApi, addItemApi, updateItemApi, deleteItemApi } from '@/service/user';
import useMomentFormat from '@/hooks/useMomentFormat';
import { useDebounce } from '@/hooks/useDebounce';

interface ListItem {
  id: number;
  name: string;
  description: string;
  password:string;
}

// 测试字段类型 ----不用可删除----
interface User extends Omit<ListItem, 'id'> {
  account: string;
  is_delete: number;
  password: string;
  token: string;
  login_name: string;
  nick_name: string;
  role_ids: number[];
  logo: string;
  avatar: string;
}

const pickerDatas = ref<[Date, Date] | null>(null);
const userList = ref<ListItem[]>([]);
const total = ref<number>(0);
const searchKeyword = ref<string>('');
const showAddDialog = ref<boolean>(false);
const showEditDialog = ref<boolean>(false);
const newItem = ref<Omit<User, 'id'>>({
  name: '',
  description: '',
  password: '',
});

const editItemData = ref<Omit<ListItem, 'id'>>({
  name: '',
  description: '',
  password: '',
});
const editingItemId = ref<number | null>(null);
const queryParams = reactive({
  pageNum: 1,
  pageSize: 7,
  startTime: null as string | null,
  endTime: null as string | null,
  keywords: null as string | null,
});

const formatHandleChange = (value: [Date, Date] | null) => {
  if (value) {
    queryParams.startTime = useMomentFormat(value[0] || '');
    queryParams.endTime = useMomentFormat(value[1] || '');
  } else {
    queryParams.startTime = null;
    queryParams.endTime = null;
  }
}
// 清空
const handleClearItems = () => {
  if(pickerDatas.value||searchKeyword.value){
    pickerDatas.value = null;
    formatHandleChange(null);
    handleclearIpt();
    ElMessage.success('清空成功');
  }
};

watch(searchKeyword, (newValue) => {
  if (newValue === '') {
    queryParams.keywords = null;
  } else {
    queryParams.keywords = newValue
  }
});

// 获取数据
const fetchItems = async () => {
  try {
    const response: any = await getListApi(queryParams);
    userList.value = response.data;
    total.value = response.total;
  } catch (error) {
    ElMessage.error('获取数据失败');
  }
};

// 新增
const addItem = async () => {
  try {
    const addData = { ...newItem.value, id: userList.value.length + 1 };
    const response: any = await addItemApi(addData);
    if (response.status == 200) {
      showAddDialog.value = false;
      newItem.value.name = '';
      newItem.value.password = '';
      newItem.value.description = '';
      ElMessage.success('添加成功');
      fetchItems();
    } else {
      ElMessage.error(response.message);
    }
  } catch (error) {
    ElMessage.error('添加失败');
  }
};

// 编辑按钮
const editItem = (item: ListItem) => {
  editingItemId.value = item.id;
  editItemData.value.name = item.name;
  editItemData.value.password = item.password;
  editItemData.value.description = item.description;
  showEditDialog.value = true;
};
// 编辑内容
const updateItem = async () => {
  try {
    if (editingItemId.value !== null) {
      const response: any = await updateItemApi(editingItemId.value, editItemData.value);
      if (response.status === 200) {
        fetchItems();
        showEditDialog.value = false;
        ElMessage.success('更新成功');
      } else {
        ElMessage.error(response.message || '更新失败');
      }
    }
  } catch (error) {
    ElMessage.error('更新失败');
  }
};

// 删除
const deleteItem = async (id: number) => {
  try {
    const response = await deleteItemApi(id);
    if (response.status === 200) {
      fetchItems();
      ElMessage.success('删除成功');
    } else {
      ElMessage.error('删除失败');
    }
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

// 搜索
const handleSearchItems = () => {
  // 搜索非空防抖
  if(pickerDatas.value||searchKeyword.value){
  queryParams.pageNum = 1;
  fetchItems();
  }
};

//   -----搜索防抖2秒一次-----
const debouncedHandleSearchItems = useDebounce(handleSearchItems, 2000, true);

const handleclearIpt = () => {
  searchKeyword.value = '';
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

<style scoped>
:deep(.el-date-editor) {
  height: 41px;
}
:deep(.el-table__header){
  background-color:#eaeaea;
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

.add_btn {
  width: 100px;
  height: 41px;
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
