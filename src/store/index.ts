/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2022-09-20 17:20:21
 * @LastEditors: fei
 * @LastEditTime: 2022-09-22 16:00:54
 */
import { defineStore } from 'pinia'
import { menuInterface } from '../utils/interface'
import { setStore, getStore, removeStore } from '../utils/storage';
import { checkResponse } from '../utils/utils';
import { publicUrl } from '../api'
import { getAction } from '../api/axios';
let userInfo = getStore('userInfo');
let menu = JSON.parse(JSON.stringify(getStore('menu')));
export const useStore = defineStore('main', {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      requestLoading: 0, //全局loading
      loginState: !!userInfo, //登录状态
      userInfo: userInfo, //用户信息
      menu: menu, //用户菜单
      breadcrumb: new Array()  //面包屑菜单
    }
  },
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setLoading(status: boolean) {
      this.requestLoading = status ? ++this.requestLoading : --this.requestLoading;
    },
    setLogin(loginInfo: any) {
      //缓存token和用户信息
      setStore('tokens', loginInfo.tokens);
      setStore('userInfo', loginInfo.userInfo);
      this.loginState = true;//设置登录状态
      this.userInfo = loginInfo.userInfo;
    },
    setLogout() {
      //缓存token和用户信息
      removeStore('tokens');
      removeStore('userInfo');
      removeStore('menu');
      this.loginState = false;
      this.userInfo = '';
      this.menu = null;
    },
    setMenu(menu: menuInterface) {
      setStore('menu', menu)
      this.menu = menu;
    },
    setBread(bread: Array<object>) {
      this.breadcrumb = bread;
    }
  }
})

