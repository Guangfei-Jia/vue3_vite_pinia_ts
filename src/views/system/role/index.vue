<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import useList from "@/composables/useList";
  import { roleUrl } from "@/api";
  import EditDialog from './components/EditDialog.vue';
  import MenuDialog from './components/MenuDialog.vue';
  import SearchForm from './components/SearchForm.vue';

  const { currentPage, pageData, changeSize, changePage, list, getList, listDelete } = useList(roleUrl);
  const editDialogRef = ref<InstanceType<typeof EditDialog>>();
  const menuDialogRef = ref<InstanceType<typeof MenuDialog>>();
  //弹窗
  const dialogShow = (componentEl:any, data?:any) => {
    componentEl.dialogShow(data);
  }
  //初始调用查询
  onMounted(getList);
</script>

<template>
  <!-- 角色管理 -->
  <div class="sys-content-wrap">
    <search-form @getList="getList"></search-form>
    <el-button
      class="sys-add-button"
      type="primary"
      size="medium"
      @click="dialogShow(editDialogRef)"
      >新增</el-button
    >
    <!-- 查询结果table -->
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column
        prop="updatedAt"
        label="创建时间"
        width="160"
      ></el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column label="操作" width="239" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="dialogShow(menuDialogRef,scope.row.id)"
            type="primary"
            plain
            :disabled="scope.row.router_type === '3'"
            v-has
            >授权</el-button>
          <el-button size="mini" @click="dialogShow(editDialogRef,scope.row)">编辑</el-button>
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
              <el-button size="mini" type="danger" v-has>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 查询结果分页 -->
    <el-pagination
      class="align-right"
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
    <menu-dialog ref="menuDialogRef" @getList="getList"></menu-dialog>
  </div>
</template>