<script setup lang="ts">
import { computed, ref, reactive } from "vue";
import { menuUrl } from "@/api";
import useDialog from "@/composables/useDialog";
import { FormInstance } from "element-plus";
import { postAction,putAction } from "@/api/axios";
import useForm from '@/composables/useForm';

const emit = defineEmits<{
  (e: "getList"): void;
}>();

const formData = {
  id: "",
  name: "",
  router_url: "",
  outer_url: "",
  router_param: "",
  router_param_val: "",
  router_type: 1,
  order: "",
  icon_url: "",
  parent_id: "",
  level_string:""
};
//表单验证相关
const validateUrl = (rule: any, value: string, callback: any) => {
  if (form.router_type == 3) {
    return callback();
  }
  if ((!value && !form.outer_url) || (value && form.outer_url)) {
    return callback(new Error("请输入路由地址或外链地址!"));
  }
  callback();
};
const validateOuterUrl = (rule: any, value: string, callback: any) => {
  if (form.router_type == 3) {
    return callback();
  }
  if ((!value && !form.router_url) || (value && form.router_url)) {
    return callback(new Error("请输入路由地址或外链地址!"));
  }
  callback();
};
const validateParam = (rule: any, value: string, callback: any) => {
  if (value && !form.router_url) {
    return callback(new Error("路由不存在，参数将无效，请先填写路由!"));
  }
  callback();
};
const validateParamVal = (rule: any, value: string, callback: any) => {
  if (form.router_param && !value) {
    return callback(new Error("存在路由参数，必须填写参数值!"));
  }
  if (value && !form.router_param) {
    return callback(new Error("路由参数为空，参数值将无效，请填写路由参数!"));
  }
  if (value && !form.router_url) {
    return callback(new Error("路由不存在，参数值将无效，请先填写路由!"));
  }
  callback();
};
const formRuleData = {
  name: [
    { required: true, message: "请输入菜单名称", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "菜单名称为 2-20 个字符",
      trigger: "blur",
    },
  ],
  router_url: [{ validator: validateUrl, trigger: "blur" }],
  outer_url: [{ validator: validateOuterUrl, trigger: "blur" }],
  router_param: [{ validator: validateParam, trigger: "blur" }],
  router_param_val: [{ validator: validateParamVal, trigger: "blur" }],
  router_type: [{ required: true, message: "菜单类型必填", trigger: "blur" }],
  order: [{ required: true, message: "排序必填", trigger: "blur" }],
};
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);           //生成表单、表单实例

const title = computed(() => {
  return (
    "菜单管理-" + (form.parent_id ? "添加子菜单" : form.id ? "修改" : "新增")
  );
});

const { dialogWidth, dialogControl, dialogShow: showDialogCopy, dialogClose } = useDialog(formData, form);
const dialogShow = (data: any, type: string) => {
  if (type == "child") {
    form.parent_id = data.id;
    form.level_string = data.level_string;//菜单层级串
    showDialogCopy();
  } else {
    form.parent_id = "";
    showDialogCopy(data);
  }
};
defineExpose({
  dialogShow
});
//表单提交验证代理
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl, async() => {
    if(form.id){
      await putAction(menuUrl.update, form);
    }else{
      await postAction(menuUrl.add, form);
    }
    dialogClose(formEl);
    emit("getList");
  })
};
</script>

<template>
  <el-dialog :title="title" v-model="dialogControl" @close="dialogClose(formRef)">
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item prop="id" class="diaplay-none">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="菜单名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入菜单名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="路由地址"
        :label-width="dialogWidth"
        prop="router_url"
      >
        <el-input
          v-model="form.router_url"
          placeholder="请输入路由地址"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="外链地址"
        :label-width="dialogWidth"
        prop="outer_url"
      >
        <el-input
          v-model="form.outer_url"
          placeholder="请输入外链地址"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="路由参数"
        :label-width="dialogWidth"
        prop="router_param"
      >
        <el-input
          v-model="form.router_param"
          placeholder="请输入路由参数"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="路由参数值"
        :label-width="dialogWidth"
        prop="router_param_val"
      >
        <el-input
          v-model="form.router_param_val"
          placeholder="请输入路由参数值"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="菜单类型"
        :label-width="dialogWidth"
        prop="router_type"
      >
        <el-select v-model="form.router_type" placeholder="请选择菜单类型">
          <el-option label="菜单" :value="1"></el-option>
          <el-option label="内页" :value="2"></el-option>
          <el-option label="按钮" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" :label-width="dialogWidth" prop="order">
        <el-input
          v-model="form.order"
          placeholder="请输入序号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单icon" :label-width="dialogWidth" prop="icon_url">
        <el-input
          v-model="form.icon_url"
          placeholder="请输入菜单icon"
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