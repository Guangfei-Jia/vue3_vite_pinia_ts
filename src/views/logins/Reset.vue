<!-- 重置 -->
<script setup lang="ts">
import { publicUrl } from "@/api";
import { postAction } from '@/api/axios';
import useRouter from "@/composables/useRouter"
import type {FormInstance} from 'element-plus'
import useForm from "@/composables/useForm";

const formData = {
  username: '',
  email: '',
}
const formRuleData = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名最少 5 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
  ]
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);
const { toLogin } = useRouter();

const onSubmit = (formEl:FormInstance | undefined) => {
  formSubmit(formEl, async () => {
    await postAction(publicUrl.sendMail,formRef)
  })
}
</script>

<template>
  <el-form :model="form" :rules="formRules" ref="formRef" class="forms">
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
    </el-form-item>
    <div class="login-buttons">
      <span class="right_span" @click="toLogin">返回登陆页</span>
    </div>
    <el-form-item>
      <el-button class="sunbit-size" type="primary" @click="onSubmit(formRef)"
        >发送邮件</el-button
      >
    </el-form-item>
  </el-form>
</template>

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