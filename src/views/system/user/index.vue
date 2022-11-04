<!-- 用户管理 -->
<script setup lang="ts">
import { ref, onMounted } from "vue";
import useList from "@/composables/useList";
import SearchForm from './components/SearchForm.vue'
import EditDialog from "./components/EditDialog.vue";
import RoleDialog from "./components/RoleDialog.vue";
import { userUrl } from "@/api";

const { currentPage, pageData, changeSize, changePage, list, getList, listDelete } = useList(userUrl);

const editDialogRef = ref<InstanceType<typeof EditDialog>>();
const roleDialogRef = ref<InstanceType<typeof RoleDialog>>();

//弹窗
const dialogShow = (componentEl:any, data?:any) => {
  componentEl.dialogShow(data);
}
//默认查询列表
onMounted(getList);
</script>

<template>
  <div class="sys-content-wrap">
    <search-form @getList="getList"></search-form>
    <el-button
      class="sys-add-button"
      type="primary"
      size="medium"
      @click="dialogShow(editDialogRef)"
      >新增</el-button
    >
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column
        prop="head_thumb"
        label="头像"
        align="center"
        width="100"
      >
        <template v-slot="scope">
          <img
            alt="头像"
            style="width: 32px; height: 32px"
            src="../../../assets/imgs//logo.png"
            v-real-img="scope.row.head_thumb"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column
        prop="username"
        label="登录账号"
        width="150"
      ></el-table-column>
      <el-table-column prop="mobile" label="手机号"></el-table-column>
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-button
            size="mini"
            @click="dialogShow(roleDialogRef,scope.row)"
            type="primary"
            plain
            :disabled="scope.row.router_type === '3'"
            v-has
            >分配角色
          </el-button>
          <el-button
            size="mini"
            @click="dialogShow(editDialogRef,scope.row)"
            v-has
            >编辑
          </el-button>
          <el-popconfirm
            style="margin-left: 10px"
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @confirm="listDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="align-right"
      background
      @size-change="(e:any) => changeSize(e, getList)"
      @current-change="(e:any) => changePage(e, getList)"
      :current-page="currentPage"
      :page-sizes="(pageData as any).pageSizes"
      :page-size="(pageData as any).pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="(pageData as any).total"
    >
    </el-pagination>
    <edit-dialog ref="editDialogRef" @getList="getList"></edit-dialog>
    <role-dialog ref="roleDialogRef" @getList="getList"></role-dialog>
  </div>
</template>