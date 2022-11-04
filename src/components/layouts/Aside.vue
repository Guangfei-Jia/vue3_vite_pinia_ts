<!--
 * @Descripttion: 左侧菜单
 * @version: 1.0
 * @Author: fei
 * @Date: 2021-08-09 15:47:55
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 16:55:52
-->
<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      style="border: none"
      :collapse="isCollapse"
      :router="ifRouter"
      :unique-opened="true"
      :default-active="activeIndex"
    >
      <template v-for="item in menuList">
        <!-- 一级菜单 -->
        <el-menu-item
          :index="item.router_url"
          v-if="!ifShowMenu(item)"
          :key="item.id"
        >
          <el-icon><House /></el-icon>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
        <el-sub-menu
          :index="item.router_url"
          v-if="ifShowMenu(item)"
          :key="item.id"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="item_child in item.children">
            <!-- 二级菜单 -->
            <el-menu-item
              :index="item_child.router_url"
              v-if="!ifShowMenu(item_child)"
              :key="item_child.id"
            >
              <span>{{ item_child.name }}</span>
            </el-menu-item>
            <el-sub-menu
              :index="item_child.router_url"
              v-if="ifShowMenu(item_child)"
              :key="item_child.id"
            >
              <template #title>{{ item_child.name }}</template>
              <!-- 三级菜单 -->
              <template v-for="item_child_child in item_child.children">
                <el-menu-item
                  :index="item_child_child.router_url"
                  v-if="item_child_child.router_type === 1"
                  :key="item_child_child.id"
                >
                  {{ item_child_child.name }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
    <!-- 控制收缩菜单 -->
    <div
      style="transition: width 0.5s"
      :style="{ width: isCollapse ? '65px' : '220px' }"
      class="sys-menu-control"
      @click="handleCollapse"
    >
      <span v-show="!isCollapse">&lt</span>
      <span v-show="isCollapse">&gt</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";

let ifRouter = ref(true);     //开启router 模式
const props = defineProps<{ isCollapse: boolean }>();
const { isCollapse } = toRefs(props); //控制收缩菜单栏的props

const menu = useStore().menu;
let menuList = useStore().menu;

if (typeof menu == "string") {
  let menuObj = JSON.parse(`{"arrays":${menu}}`);
  menuList = menuObj.arrays;
}

let activeIndex = ref("/");   //菜单选中状态
const route = useRoute();
activeIndex.value = route.path;

//判断路由是否显示为菜单
const ifShowMenu = computed(function () {
  return function (item: any) {
    let hasChild = false;
    if (item.children) {
      if (item.children.length === 0 && item.router_type === 1) {
        //当前路由属于菜单类型 但 没有子菜单 --- 不显示
        hasChild = false;
      }
      if (item.children.length > 0) {
        //有子菜单,且子菜单至少有一个是菜单，即router_type===1 --- 显示
        let atLeastOne = item.children.some((val: any) => {
          return val.router_type === 1;
        });
        if (atLeastOne) {
          hasChild = true;
        } else {
          hasChild = false;
        }
      }
    }
    return item.router_type === 1 && hasChild;
  };
});

const emit = defineEmits<{
  (e: "changeCollapse"): void;
}>();
//控制菜单缩放
const handleCollapse = () => {
  emit("changeCollapse");
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
.sys-menu-control {
  @include titlestyle;
  position: fixed;
  bottom: 0;
}
</style>
