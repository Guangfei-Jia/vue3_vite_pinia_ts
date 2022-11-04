/**
 * webwork,浏览器后台运行，处理耗时操作
 */
var time = 0;
var e = null;
// function computerWork(){
//     time = time++;
//     postMessage(time);
//     if(time > 10) {
//         clearTimeout(e)
//     }
//     e = setTimeout(computerWork,1000)
// }
onmessage = function(evt){
    //工作线程接收到主线程的消息
    //  console.log(666)
     
   //向主线程发送消息
  //  postMessage(123);
 };

// computerWork();