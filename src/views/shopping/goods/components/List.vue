<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-13 16:27:45
 * @LastEditors: fei
 * @LastEditTime: 2021-08-09 11:07:25
-->
<template>
  <div>
    <el-table :data="list" stripe border style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="introduce" label="商品简介">
        <template #default="scope">
          {{ `${scope.row.introduce.slice(0, 10)}...` }}
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="当前价格"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="pre_price"
        label="原始价格"
        width="150"
      ></el-table-column>
      <el-table-column prop="num" label="库存" width="100"></el-table-column>
      <el-table-column
        prop="updatedAt"
        label="更新时间"
        width="152"
      ></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <el-button
            size="mini"
            @click="dialogShow('showDialogOfEdit', scope.row)"
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
      @size-change="(e) => changeSize(e, getList)"
      @current-change="(e) => changePage(e, getList)"
      :current-page="currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.total"
    >
    </el-pagination>
  </div>
</template>
<script lang="ts">
type emitList = "getList" | "showDialogOfEdit";

import { defineComponent } from "vue";
import baseList from "@/composables/baseList";
import { goodsUrl } from "@/api";

export default defineComponent({
  emits: ["getList", "showDialogOfEdit"],
  setup(props, context) {
    const {
      currentPage,
      pageData,
      changeSize,
      changePage,
      list,
      getList,
      listDelete,
      addAction,
      editAction,
    } = baseList(goodsUrl);
    //控制弹窗
    const dialogShow = (dialogName: emitList, data: object): void => {
      context.emit(dialogName, data);
    };
    return {
      dialogShow,

      //分页相关
      currentPage,
      pageData,
      changeSize,
      changePage,
      //列表相关
      list,
      getList,
      addAction,
      editAction,
      listDelete,
    };
  },
});
</script>

<style scoped lang="scss">
.align-right {
  float: right;
  margin: 20px 0 0 0;
}
</style>
