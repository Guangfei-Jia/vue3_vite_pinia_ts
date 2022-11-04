<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-02 15:43:57
 * @LastEditors: fei
 * @LastEditTime: 2021-08-03 15:02:19
-->
<template>
  <!-- 角色管理 -->
  <div class="sys-content-wrap">
    <search @getList="getList"></search>
    <el-button
      class="handle-button"
      type="primary"
      size="medium"
      @click="showDialogOfEdit"
      >新增</el-button
    >
    <list
      ref="tableList"
      @getList="getList"
      @showDialogOfEdit="showDialogOfEdit"
    ></list>
    <edit-dialog ref="editDialog" @getList="getList" @add="add" @edit="edit"></edit-dialog>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  getCurrentInstance,
} from "vue";
import EditDialog from "./components/EditDialog.vue";
import List from "./components/List.vue";
import Search from "./components/Search.vue";
interface SearchData {
  name: string,
  pricePre: number,
  priceEnd: number,
  timeStart: Date,
  timeEnd: Date,
}
export default defineComponent({
  components: {
    EditDialog,
    List,
    Search,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    //查询列表
    const getList = (searchParam?: SearchData):void => {
      proxy.$refs.tableList.getList(searchParam);
    };
    //新增、修改 弹窗触发
    const showDialogOfEdit = (data?: any): void => {
      proxy.$refs.editDialog.dialogShow( data );
    };
    //子元素新增功能转发
    const add = (parmas: object, callback:any): void => {
      proxy.$refs.tableList.addAction(parmas, callback);
    }
    const edit = (parmas: object, callback:() => void): void => {
      proxy.$refs.tableList.editAction(parmas, callback);
    }
    
    onMounted(getList);

    return {
      showDialogOfEdit,
      getList,
      add,
      edit
    };
  },
});
</script>

<style lang="scss" scoped>
   .handle-button{
     margin-bottom:10px
   }
</style>