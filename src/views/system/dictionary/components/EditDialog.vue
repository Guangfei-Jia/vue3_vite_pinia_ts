
<script setup lang="ts">
import { FormInstance } from "element-plus";
import { postAction, putAction } from "@/api/axios";
import { dectionaryUrl } from "@/api";
import useDialog from "@/composables/useDialog";
import useForm from '@/composables/useForm';

const emit = defineEmits<{
  (e: "getList"): void;
}>();

const formData = {
  id: "",
  code: "",
  name: "",
  description: "",
};

const formRuleData = {
  //表单验证
  code: [{ required: true, message: "请输入字典代码", trigger: "blur" }],
  name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
};

const {form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);  //创建form
const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog( formData, form );  //创建dialog
defineExpose({
  dialogShow,
});

//表单提交
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl,async () => {
    if (form.id) {
        await putAction(dectionaryUrl.update, form);
      } else {
        await postAction(dectionaryUrl.add, form);
      }
      dialogClose(formEl);
      emit("getList");
  })
};
</script>

<template>
  <el-dialog
    :title="'字典管理-' + (form.id ? '修改' : '新增')"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose(formRef)"
  >
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item prop="id" class="diaplay-none">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="字典代码" :label-width="dialogWidth" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入字典代码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="字典名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入字典名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="字典描述"
        :label-width="dialogWidth"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请输入字典描述"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogClose(formRef)">取消</el-button>
      <el-button type="primary" @click="onSubmit(formRef)">确定</el-button>
    </template>
  </el-dialog>
</template>