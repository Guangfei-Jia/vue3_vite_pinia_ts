<script setup lang="ts">
import { } from "vue";
import useDialog from "@/composables/useDialog";
import useForm from "@/composables/useForm";
import { FormInstance } from "element-plus";
import { postAction, putAction } from "@/api/axios";
import {goodsUrl} from "@/api"
const emit = defineEmits<{
  (e:"getList",param:object):void
}>()

const formData = {
  id:"",
  name: "",
  introduce: "",
  price: "",
  pre_price: "",
  num: ""
}
var checkPrice = (rule: any, value: string, callback: any) => {
  const reg = /^[0-9]+\.?[0-9]*$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的金额'));
  } else {
    callback();
  }
};
var checkNum = (rule: any, value: number, callback: any) => {
  if (!Number.isInteger(value)) {
    callback(new Error('请输入整数'));
  } else {
    callback();
  }
};
const formRuleData = {
  name: [
    { required: true, message: "请输入商品名称", trigger: "blur" },
    {
      min: 2,
      max: 20,
      message: "商品名称最少 2 个字符,最多 20 个字符",
      trigger: "blur",
    },
  ],
  price:[
    { required: true, message: "请输入价格", trigger: "blur" },
    { validator: checkPrice, trigger: 'blur' }
  ],
  pre_price:[
    { required: true, message: "请输入价格", trigger: "blur" },
    { validator: checkPrice, trigger: 'blur' }
  ],
  num:[
    { required: true, message: "请输入库存", trigger: "blur" },
    { validator: checkNum, trigger: 'blur' }
  ],
}
const { form, formRef, formRules, formSubmit } = useForm(formData, formRuleData);
const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog(formData, form);
defineExpose({
  dialogShow
})
const onSubmit = (formEl:FormInstance | undefined) => {
  formSubmit(formEl, async () => {
    if (form.id) {
      await putAction(goodsUrl.update, form);
    } else {
      await postAction(goodsUrl.add, form);
    };
    dialogClose(formEl);
    emit("getList",form);
  })
}
</script>

<template>
  <el-dialog
    :title="'商品管理-'+(form.id?'编辑':'新增')"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose"
  >
    <el-form :model="form" ref="formRef" :rules="formRules">
      <el-form-item label="商品名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入商品名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品简介" :label-width="dialogWidth" prop="introduce">
        <el-input
          v-model="form.introduce"
          type="textarea"
          :rows="4"
          placeholder="请输入商品简介"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
          label="当前价格"
          :label-width="dialogWidth"
          prop="price"
        >
      <el-input v-model.number="form.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
          label="原始价格"
          :label-width="dialogWidth"
          prop="pre_price"
        >
      <el-input v-model.number="form.pre_price" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item
          label="库存"
          :label-width="dialogWidth"
          prop="num"
        >
      <el-input v-model.number="form.num" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogClose">取消</el-button>
      <el-button type="primary" @click="onSubmit(formRef)">确定</el-button>
    </template>
  </el-dialog>
</template>