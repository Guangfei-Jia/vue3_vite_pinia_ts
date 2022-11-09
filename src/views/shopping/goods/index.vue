<!-- 商品管理 -->
<script setup lang="ts">
import { ref,onMounted } from "vue";
import EditDialog from "./components/EditDialog.vue";
import SearchForm from "./components/SearchForm.vue";
import useList from "@/composables/useList";
import { goodsUrl } from "@/api";

const { currentPage, pageData, changeSize, changePage, list, getList, listDelete } = useList(goodsUrl);
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
//弹窗
const dialogShow = (componentEl:any, data?:any) => {
  componentEl.dialogShow(data);
}
//初始调用查询
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
      <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="introduce" label="商品简介" align="center">
        <template #default="scope">
          {{ scope.row.introduce.length>10?`${scope.row.introduce.slice(0, 10)}...`: scope.row.introduce}}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="当前价格"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="pre_price"
        label="原始价格"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column prop="num" label="库存" width="100" align="center"></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="160"
      ></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="dialogShow(editDialogRef, scope.row)"
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
            @confirm="listDelete(scope.row.id)"
          >
            <template #reference>
              <el-button size="mini" type="danger" v-has>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>