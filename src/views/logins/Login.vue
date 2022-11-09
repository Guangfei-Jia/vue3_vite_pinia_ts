<!-- 登陆 -->
<script setup lang="ts">
import { publicUrl } from "@/api";
import { useStore } from "@/store";
import { postAction, getAction } from "@/api/axios";
import { FormInstance } from "element-plus";
import { menuInterface } from '@/utils/interface'
import { createRoute } from '@/utils/utils'
import useRouter from "@/composables/useRouter";
import useForm from "@/composables/useForm";

const formData = {
  username: "",
  password: ""
}
const formRuleData = {
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, message: "用户名最少 5 个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);

const store = useStore();
const { toRegister, toReset, toIndex, router } = useRouter(); //路由跳转
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl,async () => {
    const res = await postAction(publicUrl.login, form);
    store.setLogin(res.data);
    const menures = await getAction(publicUrl.userMenuList);
    const menuData = menures.data;
    store.setMenu(menuData);
    //登陆成功，动态添加路由
    menuData.forEach(function (v: menuInterface) {
      router.addRoute('home', createRoute(v));
      if (v.children) {
        v.children.forEach(function (v2) {
          router.addRoute('home', createRoute(v2 as menuInterface))
          if ((v2 as any).children) {
            (v2 as any).children.forEach(function (v3: menuInterface) {
              router.addRoute('home', createRoute(v3))
            });
          }
        });
      }
    });
    toIndex();
  })
};
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="formRules"
    class="forms"
    size="large"
    status-icon
  >
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        show-password
        v-model="form.password"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <div class="login-buttons">
      <span class="left_span" @click="toRegister">注册账号</span>
      <span class="right_span" @click="toReset">忘记密码</span>
    </div>
    <el-form-item>
      <el-button
        class="sunbit-size"
        type="primary"
        @click="onSubmit(formRef)"
        >登陆</el-button
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
    .left_span {
      float: left;
      margin-left: 5px;
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
