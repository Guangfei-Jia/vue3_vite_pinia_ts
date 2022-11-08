<!-- 字典管理 -->
<script setup lang="ts">
import { onMounted, ref } from "vue";
import EditDialog from "./components/EditDialog.vue";
import ChildEditDialog from "./components/ChildEditDialog.vue";
import SearchForm from "./components/SearchForm.vue";
import useList from "@/composables/useList";
import { dectionaryUrl } from "@/api";

const { currentPage, pageData, changeSize, changePage, list, getList, listDelete } = useList(dectionaryUrl);
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
const childEditDialogRef = ref<InstanceType<typeof ChildEditDialog>>();
//弹窗
const dialogShow = (componentEl:any, data?:any, type?:string) => {
  componentEl.dialogShow(data,type);
}
//默认查询列表
onMounted(getList);
</script>

<template>
  <!-- 字典表管理 -->
  <div class="sys-content-wrap">
    <search-form @getList="getList"></search-form>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="dialogShow(editDialogRef)"
      >新增</el-button
    >
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="code" label="字典代码"></el-table-column>
      <el-table-column prop="name" label="字典名称"></el-table-column>
      <el-table-column prop="description" label="字典简介">
        <template #default="scope">
          {{ scope.row.description.length > 10 ? `${scope.row.description.slice(0, 10)}...` :  scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="160"
      ></el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="dialogShow(editDialogRef, scope.row)"
            v-has
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="primary"
            plain
            @click="dialogShow(childEditDialogRef, scope.row)"
            v-has
            >字典配置</el-button
          >
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
    <div class="demo-pagination-block">
      <el-pagination
      class="align-right"
      @size-change="(e:any) => changeSize(e, getList)"
      @current-change="(e:any) => changePage(e, getList)"
      :current-page="currentPage"
      :page-sizes="(pageData as any).pageSizes"
      :page-size="(pageData as any).pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="(pageData as any).total"
      />
    </div>
    
    <edit-dialog ref="editDialogRef" @getList="getList"></edit-dialog>
    <child-edit-dialog ref="childEditDialogRef"></child-edit-dialog>
  </div>
</template>

<style lang="scss" scoped>
   .handle-button{
     margin-bottom:10px
   }
</style>