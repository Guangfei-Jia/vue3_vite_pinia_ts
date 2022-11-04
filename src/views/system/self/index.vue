<template>
  <!-- 个人设置页面，开发中 -->
  <div class="sys-content-wrap">
    <el-form
      :model="selfForm"
      status-icon
      :rules="formRules"
      ref="selfFormRef"
      class="forms"
      label-width="80px"
      style="width: 60%"
    >
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="/dev/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="head_thumb" :src="head_thumb" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input
          v-model="selfForm.name"
          placeholder="请输入姓名"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="selfForm.mobile"
          placeholder="请输入手机号"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="sunbit-size"
          type="primary"
          @click="onSubmit(selfFormRef)"
          >提交修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { validateMobile } from '@/utils/validate';
import { ref, reactive,onMounted,inject } from 'vue'
import { useStore } from "@/store";

import { publicUrl } from "@/api";
import { getAction } from "@/api/axios";
import { FormInstance, FormRules } from 'element-plus';
const $message = inject<any>("$message");

let head_thumb = ref("");
let selfForm = reactive({
  name: "",
  mobile: "",
  email: "",
})
let selfFormRef = ref<FormInstance>();
const formRules = reactive<FormRules>({
  name: [
    {
      min: 2,
      max: 20,
      message: "角色名称最少 2 个字符,最多 20 个字符",
      trigger: "blur",
    },
  ],
  mobile: [{ validator: validateMobile, trigger: "blur" }],
})
let userInfo = useStore().userInfo;
let newuserinfo = (typeof userInfo === "string")?JSON.parse(userInfo):userInfo;


const beforeAvatarUpload = (file:any) => {
  const isJPG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    $message("error", "上传头像图片只能是 JPG 格式!");
  }
  if (!isLt2M) {
    $message("error", "上传头像图片大小不能超过 2MB!");
  }
  return isJPG && isLt2M;
};
 //初始化页面
const init = () => {
  getAction(publicUrl.userDetail, { id: newuserinfo.userId }).then(
        (res) => {
          selfForm = res.data;
          head_thumb = res.data.head_thumb;
        }
      );
}
onMounted(init);


    const onSubmit = (formEl: FormInstance | undefined) => {
      if(!formEl) return;
    //   formEl.validate((valid) => {
    //     if (valid) {
    //       let updateData = Object.assign({}, selfForm, {
    //         id: newuserinfo.userId,
    //         head_thumb: head_thumb,
    //       });
    //       updateSelf(updateData).then((res) => {
    //         this.loadingFormAdd = false;
    //         if (!checkResponse(res, true)) {
    //           return false;
    //         }
    //         this.loadingTable = true;
    //       });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    }

    //上传成功回调
   const handleAvatarSuccess = (res:any, file:any) => {

      // this.fileUrl = file.response.data;
      // this.head_thumb = URL.createObjectURL(file.raw);
    };
</script>

<style scoped lang="scss">
.sys-page-style {
  float: right;
  margin: 20px 0 0 0;
}
</style>
<style lang="scss">
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
