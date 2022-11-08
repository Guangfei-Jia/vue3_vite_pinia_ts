<!-- 菜单管理 -->
<script setup lang="ts">
import { ref,onMounted } from "vue";
import EditDialog from "./components/EditDialog.vue";
import useList from "@/composables/useList"
import { menuUrl  } from '@/api'

const { list, getList, listDelete } = useList(menuUrl);
const editDialogRef = ref<InstanceType<typeof EditDialog>>();
//弹窗
const dialogShow = (componentEl:any, data?:any, type?:string) => {
  componentEl.dialogShow(data,type);
}
onMounted(getList)
</script>

<style scoped lang="scss">
.forms {
  color: $main-color;
  .login-buttons {
    margin-bottom: 20px;
    overflow: hidden;
    span {
      cursor: pointer;
    }
    .left_span {
      float: left;
      margin-left: 5px;
    }
    .right_span {
      margin-right: 5px;
      float: right;
    }
  }
  .sunbit-size {
    width: 100%;
  }
}
</style>

<template>
  <!-- 菜单管理 -->
  <div class="sys-content-wrap">
    <el-button
      class="sys-add-button"
      type="primary"
      size="medium"
      @click="dialogShow(editDialogRef)"
      >新增菜单</el-button
    >
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="菜单名称" width="150" align="left"></el-table-column>
      <el-table-column
        prop="router_url"
        label="菜单路由"
        width=""
      ></el-table-column>
      <el-table-column
      align="center"
        prop="outer_url"
        label="外链路由"
        width=""
      ></el-table-column>
      <el-table-column prop="order" label="排序" width="60" align="center"></el-table-column>
      <el-table-column prop="router_type" label="类型" width="60" align="center">
        <template v-slot="scope">
          {{
            scope.row.router_type === 1
              ? "菜单"
              : scope.row.router_type === 2
              ? "内页"
              : scope.row.router_type === 3
              ? "按钮"
              : ""
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260" align="center">
        <template v-slot="scope">
          <el-button
            size="mini"
            @click="dialogShow(editDialogRef, scope.row, 'child')"
            type="primary"
            plain
            :disabled="scope.row.router_type === 3"
            >添加下级</el-button
          >
          <el-button
            size="mini"
            plain
            @click="dialogShow(editDialogRef, scope.row)"
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
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <edit-dialog ref="editDialogRef" @getList="getList"></edit-dialog>
  </div>
</template>