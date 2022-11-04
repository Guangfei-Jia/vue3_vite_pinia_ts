// /*
//  * @Author: jiaguangfei 
//  * @Date: 2020-07-13 11:01:22 
//  * @Last Modified by: jiaguangfei
//  * @Last Modified time: 2020-10-29 09:51:30
//  */
// import Vue from 'vue';

// /**
//  * 数值格式转换，每3位逗号分割，默认保留两位小数
//  * @param value 数值
//  * @param num 精度
//  */
// Vue.filter('NumberFormat', function(value, num = 2){
//     if(!value){
//         return '0';
//     }
//     let index = value.toString().indexOf ('.');
//     let numberFormat = index !== -1 
//                         ? value.toString().slice(0, index).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '' + value.toString().slice(index, index + num + 1)
//                         : value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
//     return numberFormat;
// })
// /** 
//  * 将数字统一转换为数值模式
//  * 格式：1,000.00
// */
// Vue.filter('money', function (num) {
//     if(typeof num === "undefined") return "--";
//     num = parseFloat(num).toFixed(2); //转换成两位小数的字符串
//     num = parseFloat(num);  //字符串转换为number
//     num = num.toLocaleString(); //转换为默认语言环境、默认选项格式化的字符串
//     if(num.indexOf('.') == -1) {
//         num += '.00';
//     }
//     return num;
// })
// /** 
//  * 手机号掩码
// */
// Vue.filter('mobile', function(value) {
//     if(!value){
//         return "";
//     }
//     if(value){
//         return value.substring(0, 3) + '****' + value.substring(value.length - 4);
//     }
// })
// /** 
//  * 身份证掩码
// */
// Vue.filter('idCard', function(value) {
//     if(!value){
//         return "";
//     }
//     if(value){
//         return value.substring(0, 4) + '**********' + value.substring(value.length - 4);
//     }
// })
// /** 
//  * 字符串超长省略号
// */
// Vue.filter('ellipsis',function(value, maxLength = 25) {
//     if(!value){
//         return "";
//     }
//     if(value.length > maxLength){
//         return value.slice(0, maxLength) + '...';
//     }
//     return value;
// })
// /** 
//  * 时间戳格式化
// */
// Vue.filter('dataFormat', function(dataStr) {
//     var time = new Date(dataStr);
//     function timeAdd0(time){
//         if(time < 10){
//             time = '0' + time;
//         }
//         return time;
//     }
//     var y = time.getFullYear(),
//         m = time.getMonth() + 1,
//         d = time.getDay(),
//         hh = time.getHours(),
//         mm = time.getMinutes(),
//         ss = time.getSeconds();
//     return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(hh) + ':' + timeAdd0(mm) + ":" + timeAdd0(ss);
// })