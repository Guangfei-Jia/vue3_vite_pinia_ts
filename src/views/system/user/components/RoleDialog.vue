<script setup lang="ts">
import { defineEmits, onMounted, nextTick } from "vue";
import { roleUrl } from "@/api";
import { getAction, postAction } from "@/api/axios";
import { FormInstance } from "element-plus";
import useDialog from "@/composables/useDialog";
import useList from "@/composables/useList";
import useForm from '@/composables/useForm'

const emit = defineEmits<{
  (e: "getList"):void;
}>()

//数据集
const formData = {
  id: "",
  role_id: "",
};

const { form, formRef, formSubmit } = useForm(formData);
const { dialogControl, dialogShow:showDialogCopy, dialogClose } = useDialog(formData, form);
const { list, getList } = useList(roleUrl);

//展示弹窗
const dialogShow = (data:any) => {
  showDialogCopy(getCurrentMenu(data.id))
}
//初始请求菜单
const getCurrentMenu = async (id: number) => {
  const res = await getAction(roleUrl.roleList, { id });
  nextTick(() => {
    let listArr = res?.data ?? [],
      checkedArray: number[] = [];
    listArr.forEach((item: any) => {
      checkedArray.push(item.role_id);
    });
    form.role_id = checkedArray;
    form.id = id;
  });
}
onMounted(getList);

defineExpose({
  dialogShow,
});

//表单提交验证代理
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl, async() => {
    await postAction(roleUrl.roleAdd, form);
      dialogClose();
      emit("getList");
  })
};
</script>

<template>
  <el-dialog
    title="分配角色"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose"
  >
    <el-form :model="form" ref="formRef">
      <el-form-item>
        <el-checkbox-group v-model="form.role_id" prop="role_id">
          <el-checkbox
            v-for="item in (list as any)"
            :key="item.id"
            :label="item.id"
            name="role_id"
            size="medium"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogClose(formRef)">取消</el-button>
      <el-button type="primary" @click="onSubmit(formRef)">确定</el-button>
    </template>
  </el-dialog>
</template>