<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" class="forms">
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <div class="login-buttons">
      <span class="right_span" @click="toLogin">返回登陆页</span>
    </div>
    <el-form-item>
      <el-button class="sunbit-size" type="primary" @click="onSubmit(ruleFormRef)"
        >发送邮件</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts">
import { publicUrl } from "@/api";
import { postAction } from '@/api/axios';
import useRouter from "@/composables/useRouter"
import {ref,reactive} from 'vue';
import type {FormInstance,FormRules} from 'element-plus'

const ruleForm = reactive({
  username: '',
  email: '',
})
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名最少 5 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
  ]
})

const { toLogin } = useRouter();

const onSubmit = (formEl:FormInstance | undefined) => {
  if(!formEl) return;
  formEl.validate( async (valid,fields) => {
    if(valid){
      try{
        await postAction(publicUrl.sendMail,ruleFormRef)
      }catch(error){
        console.log(error);
      }
    } else {
      console.log("error submit!", fields);
      return false;
    }
  })
}
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
