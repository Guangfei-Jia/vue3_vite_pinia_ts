<script setup lang="ts">
import {defineEmits } from "vue";
import { FormInstance } from "element-plus";
import { postAction, putAction } from "@/api/axios";
import { roleUrl } from "@/api";
import useForm from '@/composables/useForm';
import useDialog from "@/composables/useDialog";

const emit = defineEmits<{
  (e: "getList"): void;
}>();

//表单数据
const formData = {
  id: "",
  name: "",
};
//表单验证
const formRuleData = {
  name: [
    {
      min: 2,
      max: 20,
      message: "角色名称最少 2 个字符,最多 20 个字符",
      trigger: "blur",
      required: true
    },
  ],
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);           //生成表单、表单实例
const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog(formData, form); //生成dialog弹窗
defineExpose({ dialogShow });   //暴露方法给其他组件

//表单提交
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl, async ()=>{
    if (form.id) {
      await putAction(roleUrl.update, form);
    } else {
      await postAction(roleUrl.add, form);
    }
    dialogClose(formEl);
    emit("getList");
  })
};
</script>

<template>
  <el-dialog
      :title="'角色管理-' + (form.id ? '编辑' : '新增')"
      v-model="dialogControl"
      @close="dialogClose(formRef)"
    >
      <el-form :model="form" ref="formRef" :rules="formRules">
        <el-form-item prop="id" class="diaplay-none">
          <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" :label-width="dialogWidth" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
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