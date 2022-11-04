<script setup lang="ts">
import { defineEmits } from "vue";
import { FormInstance } from "element-plus";
import { postAction, putAction } from "@/api/axios";
import { userUrl } from "@/api";
import { validateEmail, validateMobile } from '@/utils/validate';
import useForm from '@/composables/useForm'
import useDialog from "@/composables/useDialog";

const emit = defineEmits<{
  (e: "getList"): void;
}>();

//表单数据
const formData = {
  id: "",
  name: "",
  username:"",
  password:"",
  mobile: "",
  email: "",
  bz: "",
};

//表单验证
const formRuleData = {
  name: [
    {
      min: 2,
      max: 20,
      message: "角色名称最少 2 个字符,最多 20 个字符",
      trigger: "blur",
    },
  ],
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 5, message: '用户名最少 5 个字符', trigger: 'blur' }
  ],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  mobile: [{ validator: validateMobile, trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);           //生成表单、表单实例
const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog(formData, form); //生成dialog弹窗
defineExpose({ dialogShow });  //暴露方法给其他组件

//表单提交验证代理
const onSubmit = (formEl: FormInstance | undefined) => {
    formSubmit(formEl,async () => {
      if (form.id) {
        await putAction(userUrl.update, form);
      } else {
        await postAction(userUrl.add, form);
      }
      dialogClose(formEl);
      emit("getList");
    }) 
};
</script>

<template>
  <el-dialog
    :title="'用户管理-' + (form.id ? '编辑' : '新增')"
    v-model="dialogControl"
    @close="dialogClose(formRef)"
  >
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item prop="id" class="diaplay-none">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="dialogWidth" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号" :label-width="dialogWidth" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号" :disabled="form.id?true:false"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="dialogWidth" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" :disabled="form.id?true:false"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="dialogWidth" prop="email">
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱/用于找回密码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="账号描述" :label-width="dialogWidth" prop="bz">
        <el-input
          v-model="form.bz"
          placeholder="请输入账号描述"
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