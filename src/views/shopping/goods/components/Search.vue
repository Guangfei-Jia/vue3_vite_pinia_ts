<template>
  <el-form
    :inline="true"
    :model="searchParam"
    ref="formSearch"
    class="demo-form-inline"
  >
    <el-row :gutter="10">
      <el-col :span="6">
        <el-form-item label="商品名称" prop="name" style="width:100%">
          <el-input
            v-model="searchParam.name"
            size="medium"
            placeholder="商品名称"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="价格区间">
          <el-col :span="11">
            <el-form-item prop="pricePre">
              <el-input
                v-model="searchParam.pricePre"
                size="medium"
                placeholder="最小值"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="priceEnd">
              <el-input
                v-model="searchParam.priceEnd"
                size="medium"
                placeholder="最大值"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="更新时间">
            <el-form-item prop="time">
              <el-date-picker
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="medium"
                v-model="searchParam.time"
                :default-time="[new Date(2021, 1, 1, 0, 0, 0),
                                new Date(2021, 2, 1, 23, 59, 59)]"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" size="medium" @click="clickSearch"
          >查询</el-button
        >
        <el-button size="medium" @click="formReset('formSearch')"
          >重置</el-button
        >
      </el-form-item>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from "vue";
import { filterObj } from '@/utils/utils';
export default defineComponent({
  emits: ["getList"],
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;

    const searchParam = reactive({
      //查询角色表单
      name: "",
      pricePre: "",
      priceEnd: "",
      time:"",
      timeStart: "",
      timeEnd: "",
    });

    //查询触发回调
    const clickSearch = () => {
      //此处结束时间需要转换为23:59:59
      if(searchParam.time && searchParam.time[0]){
        searchParam.timeStart = searchParam.time[0];
        searchParam.timeEnd = searchParam.time[1];
      }
      context.emit("getList", filterObj(searchParam));
    };

    //重置查询表单
    const formReset = (formSearch: string) => {
      const form: any = proxy.$refs[formSearch];
      form.resetFields();
      searchParam.timeStart = "";
      searchParam.timeEnd = "";
      context.emit("getList", filterObj(searchParam));
    };

    return {
      searchParam,
      clickSearch,
      formReset,
    };
  },
});
</script>
