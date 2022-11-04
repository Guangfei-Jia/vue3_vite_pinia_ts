<script setup lang="ts">
import { toRefs } from "vue";
import useDialog from "@/composables/useDialog";
import { FormInstance } from "element-plus";
import { postAction, putAction } from "@/api/axios";
import { dectionaryChildUrl } from "@/api";
import useForm from "@/composables/useForm";

const emit = defineEmits<{
  (e: "getList",parmas:object): void;
}>();
const props = defineProps<{ parent_id: number }>()
const { parent_id } = toRefs(props);

const formData = {
  id: "",
  code: "",
  name: "",
  parent_id,
  description: "",
};
const formRuleData = {
  code: [{ required: true, message: "请输入字典代码", trigger: "blur" }],
  name: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
}
const { form, formRef, formRules, formSubmit } = useForm(formData,formRuleData);
const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog(formData,form);
defineExpose({
  dialogShow,
});
//表单提交验证代理
const onSubmit = (formEl: FormInstance | undefined) => {
  formSubmit(formEl, async ()=>{
    if (form.id) {
      await putAction(dectionaryChildUrl.update, form);
    } else {
      await postAction(dectionaryChildUrl.add, form);
    }
    dialogClose(formEl);
    emit("getList",{parent_id:form.parent_id});
  })
};
</script>
<template>
  <el-dialog
    :title="'字典数据配置-' + (form.id ? '编辑' : '新增')"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose(formRef)"
  >
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item prop="id" class="diaplay-none">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="数据代码" :label-width="dialogWidth" prop="code">
        <el-input
          v-model="form.code"
          placeholder="请输入数据代码"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="数据名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入数据名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="数据描述"
        :label-width="dialogWidth"
        prop="description"
      >
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="请输入数据描述"
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
