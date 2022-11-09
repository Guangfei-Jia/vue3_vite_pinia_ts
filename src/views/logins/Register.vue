<!-- 注册 -->
<script setup lang="ts">
import { publicUrl } from "@/api";
import { postAction } from '@/api/axios';
import { FormInstance } from "element-plus";
import useRouter from "@/composables/useRouter"
import useForm from "@/composables/useForm";

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};
const validateEmail = (rule: any, value: any, callback: any) => {
  var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;  
  if(!reg.test(value)){
    callback(new Error("请输入正确格式的邮箱！"));
  }else{
    callback();
  }
};

const formData = {
  username: "",
  password: "",
  password2: "",
  email: "",
};
const formRuleData = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, message: '用户名最少 5 个字符', trigger: 'blur' }
  ],
  password: [{ validator: validatePass, trigger: "blur" }],
  password2: [{ validator: validatePass2, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }]
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);

const { toLogin } = useRouter();
const onSubmit = (formEl:FormInstance | undefined) => {
  formSubmit(formEl, async ()=> {
    await postAction(publicUrl.register, form);
      toLogin();
  })
};
</script>

<template>
    <el-form
      :model="form"
      status-icon
      :rules="formRules"
      ref="formRef"
      class="forms"
      >
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" show-password v-model="form.password" placeholder="请输入密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input type="password" show-password v-model="form.password2"  placeholder="再次确认密码" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="text" v-model="form.email"  placeholder="请输入邮箱/用于找回密码" autocomplete="off"></el-input>
      </el-form-item>
      <div class="login-buttons">
        <span class="right_span" @click="toLogin">返回登陆页</span>
      </div>
      <el-form-item>
        <el-button class="sunbit-size" type="primary" @click="onSubmit(formRef)">提交注册</el-button>
      </el-form-item>
    </el-form>
</template>

<style lang="scss" scoped>
  .forms{
    color: $main-color;
    .login-buttons{
      margin-bottom: 20px;
      overflow: hidden;
      span{
        cursor: pointer;
      }
      .right_span{
        margin-right: 5px;
        float: right;
      }
    }
    .sunbit-size{
      width: 100%;
    }
  }  
</style>
