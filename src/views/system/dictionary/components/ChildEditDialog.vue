
<script setup lang="ts">
import { ref, provide } from "vue";
import EditDialog from "./components/EditDialog.vue";
import SearchForm from "./components/SearchForm.vue";
import useDialog from "@/composables/useDialog";
import useList from "@/composables/useList";
import { dectionaryChildUrl } from "@/api";

const parent_id = ref(-1);

const { dialogControl, dialogShow: showDialogCopy, dialogClose} = useDialog({});
const dialogShow = (data: any) => {
    parent_id.value = data.id;
    showDialogCopy({},()=>getList({parent_id:data.id}));
};
defineExpose({
  dialogShow,
});

const { currentPage, pageData, changeSize, changePage, list, getList, listDelete} = useList(dectionaryChildUrl);
const childEditDialogRef = ref<InstanceType<typeof EditDialog>>();
//弹窗
const showChildDialog = (componentEl: any, data?: any) => {
  componentEl.dialogShow(data);
};
</script>

<template>
  <el-dialog
    title="字典配置"
    :width="900"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose"
  >
    <search-form @getList="getList" :parent_id="parent_id"></search-form>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showChildDialog(childEditDialogRef)"
      style="margin-bottom: 10px"
      >新增</el-button
    >
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="code" label="数据编码" align="center" width="100"></el-table-column>
      <el-table-column prop="name" label="数据名称" align="center"></el-table-column>
      <el-table-column prop="description" label="数据简介" align="center">
        <template #default="scope">
          {{
            scope.row.description.length > 10
              ? `${scope.row.description.slice(0, 10)}...`
              : scope.row.description
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="160"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="showChildDialog(childEditDialogRef, scope.row)"
            v-has
            >编辑</el-button
          >
          <el-popconfirm
            style="margin-left: 10px"
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            @confirm="listDelete(scope.row.id,{parent_id})"
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
  </el-dialog>
  <edit-dialog
      ref="childEditDialogRef"
      @getList="getList"
      :parent_id="parent_id"
    ></edit-dialog>
</template>