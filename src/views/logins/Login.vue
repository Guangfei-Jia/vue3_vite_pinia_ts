<script setup lang="ts">
import { publicUrl } from "@/api";
import { useStore } from "@/store";
import { postAction, getAction } from "@/api/axios";
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import useRouter from "@/composables/useRouter";
import { menuInterface } from '@/utils/interface'
import { createRoute } from '@/utils/utils'

let ruleForm = reactive({ username: "", password: "" });

const formSize = ref("large"); //table 大小
const store = useStore();
const ruleFormRef = ref<FormInstance>(); //table ref
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, message: "用户名最少 5 个字符", trigger: "blur" },
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
}); //table验证规则

const { toRegister, toReset, toIndex, router } = useRouter(); //路由跳转

const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (!valid) {
      console.log("error submit!", fields);
      return false;
    }
    try {
      let res = await postAction(publicUrl.login, ruleForm);
      store.setLogin(res.data);
      let menures = await getAction(publicUrl.userMenuList);
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
    }catch(error){
      console.log("error post!", error);
    }
  });
};
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="forms"
    :size="formSize"
    status-icon
  >
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        show-password
        v-model="ruleForm.password"
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
        @click="onSubmit(ruleFormRef)"
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
