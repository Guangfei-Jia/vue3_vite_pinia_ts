/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2022-09-16 10:24:26
 * @LastEditors: fei
 * @LastEditTime: 2022-09-22 16:58:58
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)

// 如果您正在使用CDN引入，请删除下面一行。
//引入 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

//引入vue-router路由
import router from './router'
app.use(router);

import { createPinia } from 'pinia'
app.use(createPinia());

//引入element,控制中文展示
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/dist/index.css'
app.use(ElementPlus, { locale });

//引入svg
import BaseSvgIcon from './components/BaseSvgIcon.vue'; // svg组件
// 全局注册
app.component('svg-icon', BaseSvgIcon);
const files: any = import.meta.glob('./assets/icons/svg/*.svg', { eager: true });
const modules: any = {};
for (const key in files) {
    if (Object.prototype.hasOwnProperty.call(files, key)) {
        modules[key.replace(/(\.\/|\.ts)/g, '')] = files[key].default
    }
}
export default modules;

//修改全局message函数
import { message } from './utils/utils';
app.provide('$message', message)  //使用依赖注入代替globalProperties，因为在setup中无法使用this调用globalProperties

//判断按钮权限指令，没有权限移除按钮元素
app.directive('has', async (el, binding, vnode) => {
    let array = (<any>binding).instance.$route.meta.info.children;
    let hasArray = array.filter((item: { name: string }) => {
        return item.name == el.textContent;
    })
    if (hasArray.length <= 0) {
        el.parentNode.removeChild(el);
    }
})
import { imgExist } from '@/utils/utils';
app.directive('real-img', async (el, binding) => {
    let imgUrl = binding.value;
    if (imgUrl) {
        let effect = await imgExist(imgUrl);
        if (effect) {
            el.setAttribute('src', imgUrl);
        }
    }
})
app.config.errorHandler = (err, vm, info) => {
    //全局捕获错误，避免应用崩溃。
    //捕获组件生命周期钩子里的错误；捕获 Vue 自定义事件处理函数内部的错误；DOM 监听器内部抛出的错误；promise错误等
    //`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    // console.log(err)
    // console.log(info)
}
app.config.warnHandler = function (msg, vm, trace) {
    //全局捕获警告信息
    // `trace` 是组件的继承关系追踪，方便追溯问题所在
    // console.log(trace)
}

//挂载实例
app.mount('#app')