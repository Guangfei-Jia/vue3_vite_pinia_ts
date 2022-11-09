<script setup lang="ts">
import { FormInstance } from "element-plus";
import useForm from '@/composables/useForm'

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
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="用户名称" prop="name" style="width:100%">
          <el-input
            v-model="form.name"
            size="medium"
            placeholder="用户名称"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item>
          <el-button
            type="primary"
            size="medium"
            @click="onSubmit(formRef)"
            >查询</el-button
          >
          <el-button size="medium" @click="onReset(formRef)">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>