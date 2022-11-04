/* eslint-disable */
import axios from 'axios';
import config from '@/utils/config' // 路径配置
import { useStore } from '@/store';
import { getStore } from '@/utils/storage';
import $router from '@/router';
import { message } from '@/utils/utils'

const service = axios.create({
  baseURL: (<any>config).baseURL,
  timeout: 10000  //请求超时时间
})

//配置发送请求前的拦截器 可以设置token信息 
service.interceptors.request.use(
  config => {
    //loading+1
    useStore().setLoading(true)  //开启loading
    //正在请求更新token时，其他接口等待
    config.headers = { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" }
    let tokenString = getStore('tokens');
    if (tokenString) {
      const tokenArray = tokenString.substring(1, tokenString.length - 1).replace(/\"/g, "").split(",");
      let tokens: any = {}
      for (let item of tokenArray) {
        let items = item.split(":");
        tokens[items[0]] = items[1];
      }
      //设置请求头token
      let accessToken = tokens.accessToken,
        tokenType = tokens.tokenType;
      config.headers.Authorization = `${tokenType} ${accessToken}`;
    }
    return config;
  },
  error => {
    //出错时loading重置
    setTimeout(function () {
      useStore().$reset();//重置为初始值0
    })
    return Promise.reject(error);
  }
)

// 配置响应拦截器 
service.interceptors.response.use(
  response => {
    const { code, message: msg } = response.data;

    // loading - 1
    useStore().setLoading(false); //关闭loading

    // 这里处理一些response 正常放回时的逻辑
    switch (code) {
      //自由约定不同状态码下前端的处理逻辑
      case -1:
        message('warning', msg);
        return Promise.reject(response);
      // case 200:
      //     response.msg !== '' && notice(response.msg, 'message', 'success');
      //     return Promise.resolve(response);
      // case 401:
      //     $router.replace('/logins/login');
      //     // $router.replace('/login?redirect=' + $router.currentRoute.fullPath);
      //     store.dispatch('SET_LOGOUT');
      //     return Promise.resolve(response);
      case 4010:
        // $router.replace('/login?redirect=' + $router.currentRoute.fullPath);   //登录后跳转到上次退出的页面
        message("warning", msg);
        $router.replace('/logins/login');
        useStore().setLogout(); //退出系统
        return Promise.resolve(response);
    }
    return Promise.resolve(response.data) // 这里直接返回data, 即接口返回的所有数据
  },
  error => {
    //loading-1
    useStore().setLoading(false);  //关闭loading
    if (!error.response) {
      message('warning', "请求服务超时！");
      return Promise.reject(error);
    }
    const status = Number(error.response.status);
    switch (status) {
      case 500:
        message('warning', "服务器连接失败，请稍后再试!");
        return Promise.reject(error);
      default:
        message('warning', "请求服务异常!");
        return Promise.reject(error);
    }

    //   // 判断是否登录失效，按照实际项目的接口返回状态来判断
    //   if (error.toString().includes('776')) {
    //       window.location.href = window.location.origin + '/#/login'
    //   }
  }
)

export default service
