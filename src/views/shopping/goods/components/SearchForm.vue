<template>
  <el-form :inline="true" :model="form" ref="formRef" class="demo-form-inline">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="商品名称" prop="name" style="width: 100%">
          <el-input
            v-model="form.name"
            size="medium"
            placeholder="商品名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="价格区间" style="width: 100%">
          <el-form-item prop="pricePre" class="twoInput" style="width: 48%">
            <el-input
              v-model="form.pricePre"
              size="medium"
              placeholder="最小值"
              clearable
            ></el-input>
          </el-form-item>
          <span style="width: 4%; text-align: center">-</span>
          <el-form-item prop="priceEnd" class="twoInput" style="width:48%">
            <el-input
              v-model="form.priceEnd"
              size="medium"
              placeholder="最大值"
              clearable
            ></el-input>
          </el-form-item>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="更新时间" prop="time" style="width: 100%">
          <el-date-picker
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="medium"
            value-format="YYYY-MM-DD"
            v-model="form.time"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="24" align="center">
        <el-form-item>
          <el-button type="primary" size="medium" @click="onSubmit(formRef)"
            >查询</el-button
          >
          <el-button size="medium" @click="onReset(formRef)">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import useForm from "@/composables/useForm";
import { FormInstance } from "element-plus";
const emit = defineEmits<{
  (e: "getList", param: object): void;
}>();

const formData = {
  name: "",
  pricePre: "",
  priceEnd: "",
  time: "",
  timeStart: "",
  timeEnd: "",
};
const { form, formRef, formSubmit, formReset } = useForm(formData);

//查询
const onSubmit = (formRef: FormInstance | null) => {
  formSubmit(formRef, () => {
    form.timeStart = form.time?form.time[0]+" 00:00:00":'';
    form.timeEnd = form.time?form.time[1]+" 23:59:59":'';
    emit("getList", form);
  });
  // //此处结束时间需要转换为23:59:59
  // if(searchParam.time && searchParam.time[0]){
  //   searchParam.timeStart = searchParam.time[0];
  //   searchParam.timeEnd = searchParam.time[1];
  // }
};

//重置
const onReset = (formRef: FormInstance | null) => {
  formReset(formRef, () => {
    form.timeStart = '';
    form.timeEnd = '';
    emit("getList", form);
  });
};
</script>
