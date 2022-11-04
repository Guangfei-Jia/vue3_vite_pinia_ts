<script setup lang="ts">
import { toRefs } from "vue";
import { FormInstance } from "element-plus";
import useForm from '@/composables/useForm'

const emit = defineEmits<{
  (e: "getList", params:object):void
}>()
const props = defineProps<{parent_id:number}>();
const { parent_id } = toRefs(props);

const formData = {
  //查询角色表单
  code: "",
  name: "",
  parent_id
};
const { form, formRef, formSubmit, formReset } = useForm(formData);

//查询
const onSubmit = (formEl:FormInstance | null) => {
  formSubmit(formEl,()=>{
    emit("getList",form);
  })
};
//重置表单
const onReset = (formEl:FormInstance | null) => {
  formReset(formEl,()=>{
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
        <el-form-item label="数据代码" prop="code" style="width:100%">
          <el-input
            v-model="form.code"
            size="medium"
            placeholder="数据代码"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="数据名称" prop="name" style="width:100%">
          <el-input
            v-model="form.name"
            size="medium"
            placeholder="数据名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" size="medium" @click="onSubmit(formRef)">查询</el-button>
        <el-button size="medium" @click="onReset(formRef)">重置</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>