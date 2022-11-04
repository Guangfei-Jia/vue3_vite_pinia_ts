<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-07-21 10:15:07
 * @LastEditors: fei
 * @LastEditTime: 2022-10-08 14:49:25
-->
<template>
  <el-dialog
    :title="'商品管理-'+(formAdd.id?'编辑':'新增')"
    v-model="dialogControl"
    destroy-on-close
    @close="dialogClose"
  >
    <el-form :model="formAdd" ref="formRef" :rules="formAddRules">
      <el-form-item label="商品名称" :label-width="dialogWidth" prop="name">
        <el-input
          v-model="formAdd.name"
          placeholder="请输入商品名称"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品简介" :label-width="dialogWidth" prop="introduce">
        <el-input
          v-model="formAdd.introduce"
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
      <el-input v-model.number="formAdd.price" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
          label="原始价格"
          :label-width="dialogWidth"
          prop="pre_price"
        >
      <el-input v-model.number="formAdd.pre_price" autocomplete="off"></el-input>
    </el-form-item>
     <el-form-item
          label="库存"
          :label-width="dialogWidth"
          prop="num"
        >
      <el-input v-model.number="formAdd.num" autocomplete="off"></el-input>
    </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogClose">取消</el-button>
      <el-button type="primary" @click="handleAddSubmit">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
} from "vue";
import useDialog from "@/composables/useDialog";

export default defineComponent({
  emits: ["getList","add","edit"],
  data() {
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
    return {
      formAddRules: {
        //表单验证
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
      },
    };
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;

    const formData = {
      id:-1,
      name: "",
      introduce: "",
      price: "",
      pre_price: "",
      num: ""
    };
    //编辑表单
    const formAdd: any = reactive(formData);
   
    const { dialogWidth, dialogControl, dialogShow, dialogClose } = useDialog(formAdd, formData);

    //表单提交验证代理
    const handleAddSubmit = () => {
      proxy.$refs.formRef.validate((res:boolean ) => {
        if(!res){
          proxy.$message("error", "输入内容不合法，请查看页面提示信息!");
          return;
        }
        if (formAdd.id) {
          context.emit("edit", formAdd, dialogClose);
        } else {
          context.emit("add", formAdd, dialogClose);
        }
      });
    };
    return {
      dialogWidth,
      dialogClose,
      handleAddSubmit,
      dialogShow,
      dialogControl,
      formAdd,
    };
  },
});
</script>