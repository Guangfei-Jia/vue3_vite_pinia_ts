<script setup lang="ts">
import { defineEmits, reactive, ref } from "vue";
import { roleUrl, menuUrl } from "@/api";
import { getAction, postAction } from "@/api/axios";
import useDialog from "@/composables/useDialog";

const emit = defineEmits<{
  (e: "getList"): void;
}>();

const treeRef = ref();    //树组件实例
const treeData = ref([]); //树组件数据
const thisId = ref(-1);   //当前节点id
const defaultProps = reactive({
  //树配置
  label: "name",
  children: "children",
});

const { dialogControl, dialogShow: showDialogCopy, dialogClose } = useDialog({});
const dialogShow = (id: number) => {
  showDialogCopy(null, () => getAllRole(id));
};
defineExpose({ dialogShow });

//获取当前id对应的树结构
const getRole = async (id: number) => {
  thisId.value = id;
  const res = await getAction(menuUrl.getRoleMenu, { id });
  //弹窗组件初始化后，已有角色勾选
  let list = res?.data ?? [],
      checkedArray: Array<number> = [];
  list.forEach((item: any) => {
    let nodes = treeRef.value.getNode(item.menu_id);
    if (nodes.isLeaf) {
      checkedArray.push(item.menu_id);
    }
  });
  treeRef.value.setCheckedKeys(checkedArray); //置空默认勾选的树节点
};

//获取全部角色列表，初始化当前角色
const getAllRole = async (id: number) => {
  const res = await postAction(menuUrl.list, {}); //获取全部角色，后期放到缓存中，避免多次调用
  treeData.value = res.data.rows;
  getRole(id);
};

//授权提交
const onSubmit = async () => {
  let checkArrays = treeRef.value.getCheckedKeys(),
    harfCheckArray = treeRef.value.getHalfCheckedKeys();
  let requestData = {
    role_id: thisId.value,
    menu_ids: checkArrays.concat(harfCheckArray),
  };
  await postAction(roleUrl.menuAdd, requestData);
  dialogClose();
  emit("getList");
};
</script>

<template>
  <el-dialog
    title="菜单授权"
    v-model="dialogControl"
    @close="dialogClose"
  >
    <el-tree
      ref="treeRef"
      :data="treeData"
      :default-expand-all="true"
      :check-on-click-node="true"
      show-checkbox
      node-key="id"
      :props="defaultProps"
    >
    </el-tree>
    <template #footer>
      <el-button @click="dialogClose">取消</el-button>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
