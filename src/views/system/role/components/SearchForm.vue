<script setup lang="ts">
import useForm from '@/composables/useForm';
import { FormInstance } from 'element-plus';

const emit = defineEmits<{
  (e: "getList",param:object):void
}>()
//表单数据
const formData = {
  name: ""
};
const { form, formRef, formSubmit, formReset } = useForm(formData);   //生成表单、表单实例
//查询
const onSubmit = (formRef:FormInstance | undefined) => {
  formSubmit(formRef,() => {
    emit("getList",form);
  })
};
//重置
const onReset = (formRef:FormInstance | undefined) => {
  formReset(formRef,() => {
    emit("getList",form);
  })
};
</script>

<template>
  <el-form
    :inline="true"
    :model="form"
    ref="formRef"
    class="demo-form-inline"
  >
    <el-form-item label="角色" prop="name">
      <el-input
        v-model="form.name"
        size="medium"
        placeholder="角色"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="medium"
        @click="onSubmit(formRef)"
        >查询</el-button
      >
      <el-button size="medium" @click="onReset(formRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>