<!--
 * @Descripttion: 页面顶部
 * @version: 1.0
 * @Author: fei
 * @Date: 2021-08-09 15:42:55
 * @LastEditors: fei
 * @LastEditTime: 2021-12-23 10:00:45
-->
<template>
  <div>
    <!-- 标题logo -->
    <div
      class="sys-title"
      style="transition: width 0.5s"
      :style="{ width: isCollapse ? '65px' : '220px' }"
    >
      <span v-show="!isCollapse">{{ systemName }}</span>
      <!-- <img v-show="isCollapse" class="sys-index-logo" src="../assets/imgs/logo.png" alt="logo"> -->
    </div>
    <div class="sys-right-set">
          <el-dropdown @command="handles">
            <span class="el-icon-setting">
              <el-icon><Setting /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="setting">个人设置</el-dropdown-item>
                <!-- <el-dropdown-item command="setColor">切换主题</el-dropdown-item> -->
                <el-dropdown-item command="setLogout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span v-if="userInfo">{{ userInfo.name }}</span>
      <!-- <el-dropdown @command="handles">
        <span class="el-dropdown-link">
          <el-icon><Setting /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="setLogout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useStore } from '@/store';

import useRouter from "@/composables/useRouter";
import { getStore } from '@/utils/storage';

const systemName = "管理系统";
const props = defineProps<{ isCollapse: boolean }>()
const {isCollapse} = toRefs(props);

let userInfo = JSON.parse(getStore('userInfo'));
const { toSelf, toLogin } = useRouter();

const store = useStore();
const handles = (command: string) => {
      //退出登陆
      if (command === "setLogout") {
        store.setLogout();
        toLogin();
      }
      //个人设置
      if (command === "setting") {
        toSelf();
      }
    };
</script>

<style lang="scss" scoped>
@mixin titlestyle {
  height: 60px;
  line-height: 60px;
  color: $white-color;
  background-color: $main-color;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
}
.el-container {
  overflow: scroll;
}

.sys-title {
  @include titlestyle;
  float: left;
  &::before {
    content: "";
    position: absolute;
    left: 20px;
    top: 15px;
    background: url("../../assets/imgs/logo.png");
    background-size: cover;
    width: 30px;
    height: 30px;
  }
}
.sys-right-set {
  float: right;
  margin-right: 20px;
  height: 60px;
  line-height: 60px;

}
.el-icon-setting {
    cursor: pointer;
    margin-top:22px;
    margin-right: 8px;
  }
</style>
