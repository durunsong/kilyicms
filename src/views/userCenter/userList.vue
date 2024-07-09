<template>
  <div>
    <div class="search_container">
      <el-input class="search_input" v-model.trim="searchKeyword" placeholder="搜索关键字" @keyup.enter="searchItems" clearable
        @clear="handleclear" />
      <el-button class="search_btn" type="primary" @click="searchItems">搜索</el-button>
    </div>
    <el-button class="add_btn" type="primary" @click="showAddDialog = true">添加项目</el-button>
    <el-table :data="userList" style="width: 100%">
      <el-table-column label="序号" width="100">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button @click="editItem(scope.row)">编辑</el-button>
          <el-button type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination small background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper" :total="total" :current-page="queryParams.page"
        :page-size="queryParams.pageSize" />
    </div>

    <!-- 添加项目的对话框 -->
    <el-dialog title="添加项目" v-model="showAddDialog">
      <el-form :model="newItem">
        <el-form-item label="名称">
          <el-input v-model="newItem.name"></el-input>
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

interface ListItem {
  id: number;
  name: string;
  description: string;
}

const userList = ref<ListItem[]>([]);
const total = ref<number>(0);
const searchKeyword = ref<string>('');
const showAddDialog = ref<boolean>(false);
const showEditDialog = ref<boolean>(false);
const newItem = ref<Omit<ListItem, 'id'>>({ name: '', description: '' });
const editItemData = ref<Omit<ListItem, 'id'>>({ name: '', description: '' });
const editingItemId = ref<number | null>(null);
const queryParams = reactive({
  page: 1,
  pageSize: 3,
  keyword: '',
});

watch(searchKeyword, (newValue) => {
  if (newValue === '') {
    queryParams.keyword = ''
  } else {
    queryParams.keyword = newValue
  }
});

// 获取数据
const fetchItems = async () => {
  try {
    const response:any = await getListApi(queryParams);
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
    if (response.status === 200) {
      fetchItems();
      showAddDialog.value = false;
      newItem.value.name = '';
      newItem.value.description = '';
      ElMessage.success('添加成功');
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
const searchItems = () => {
  queryParams.page = 1;
  fetchItems();
};

const handleclear = () => {
  searchKeyword.value = '';
  queryParams.keyword = '';
  queryParams.page = 1;
  fetchItems();
};

const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  queryParams.page = 1;
  fetchItems();
};

const handleCurrentChange = (val: number) => {
  queryParams.page = val;
  fetchItems();
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
.search_container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .search_input{
    width: 400px;
    height: 42px;
  }
  .search_btn{
    height: 41px;
    width: 100px;
  }
}

.dialog-footer {
  text-align: right;
}
.add_btn{
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
