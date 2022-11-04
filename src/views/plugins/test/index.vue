<template>
    <div>
        <input type="file" ref="files" @change="getFile"/>
        <div>
            <div>文件名称：{{name}}</div>
            <div>文件初始大小：{{size}}</div>
            <div>文件原始尺寸：{{width}}*{{height}}</div>
        </div>
        <div>
            <img :src="srcs" />
            <img  :src="srcs2" />
            <img id="img3" :src="srcs3" style="display:none;" />
        </div>
        <button @click="getFile">压缩提交文件</button>

        <canvas id="thumsCanvas" width="200" height="600"></canvas>
    </div>
</template>

<script>
import {Press1} from "@/utils/utils";

export default {
    data(){
        return {
            srcs:"#",
            srcs2:"#",
            srcs3:require("../../../assets/imgs/logo.png"),
            
            size:0,
            width:0,
            height:0,
            name:""
        }
    },
    mounted () {
        let that = this;
        const canvas = document.getElementById('thumsCanvas');
        let context = canvas.getContext('2d');
        let img = document.getElementById("img3");
        // let image = new Image();
        // image.onload = function(){
        let ani = new Press1(img,250/2-50/2,500-50,20,20);

function render(){
        //context.clearRect(0,0,250,500); // clear canvas
        //添加透明背景色填充，实现拖尾效果
        context.fillStyle = 'rgba(255,255,255,0.5)';
        context.fillRect(0,0,250,500);
        ani.draw(context);
        window.requestAnimationFrame(render)
    }    
    render();
        // }

        
    },
    methods:{
        /**
* @param {二进制文件流} file 
* @param {回调函数，返回base64} fn 
*/
changeFileToBaseURL(file,fn){
  // 创建读取文件对象
      var fileReader = new FileReader();
      //如果file没定义返回null
      if(file == undefined) return fn(null);
      // 读取file文件,得到的结果为base64位
      fileReader.readAsDataURL(file);
                    this.size = file.size

      fileReader.onload = function(){
        // 把读取到的base64
        var imgBase64Data = this.result;
        fn(imgBase64Data);
      }
    },
    /**
 * 将base64转换为文件
 * @param {baseURL} dataurl 
 * @param {文件名称} filename 
 * @return {文件二进制流}
*/
dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
 },
 /**
* canvas压缩图片
* @param {参数obj} param 
* @param {文件二进制流} param.file 必传
* @param {目标压缩大小} param.targetSize 不传初始赋值-1
* @param {输出图片宽度} param.width 不传初始赋值-1，等比缩放不用传高度
* @param {输出图片名称} param.fileName 不传初始赋值image
* @param {压缩图片程度} param.quality 不传初始赋值0.92。值范围0~1
* @param {回调函数} param.succ 必传
*/
// pressImg(param){
//   //如果没有回调函数就不执行
//   if(param && param.succ){
//      //如果file没定义返回null
//      if(param.file == undefined) return param.succ(null);
//      //给参数附初始值
//      param.targetSize = param.hasOwnProperty("targetSize") ? param.targetSize : -1;
//      param.width = param.hasOwnProperty("width") ? param.width : -1;
//      param.fileName = param.hasOwnProperty("fileName") ? param.fileName: "image";
//      param.quality = param.hasOwnProperty("quality") ? param.quality : 0.92;
//      var _this = this;
//     //  // 得到文件类型
//     //  var fileType = param.file.type;
//     //  // console.log(fileType) //image/jpeg
//     //  if(fileType.indexOf("image") == -1){
//     //    console.log('请选择图片文件^_^');
//     //    return param.succ(null);
//     //  }
//     //  //如果当前size比目标size小，直接输出
//     //  var size = param.file.size;
//     //  if(param.targetSize > size){
//     //    return param.succ(param.file);
//     //  }
//      // 读取file文件,得到的结果为base64位
//      this.changeFileToBaseURL(param.file,function(base64){
//        if(base64){
//          var image = new Image();
//          image.src = base64;
//          image.onload = function(){
//              const { width:naturalWidth, height:naturalHeight} = image;
//                     _this.width = naturalWidth
//                     _this.height = naturalHeight
//            // 获得长宽比例
//            var scale = this.width / this.height;
//            // console.log(scale);
//            //创建一个canvas
//            var canvas = document.createElement('canvas');
//            //获取上下文
//            var context = canvas.getContext('2d');
//            //获取压缩后的图片宽度,如果width为-1，默认原图宽度
//            canvas.width = param.width == -1 ? this.width : param.width;
//            //获取压缩后的图片高度,如果width为-1，默认原图高度
//            canvas.height = param.width == -1 ? this.height : parseInt(param.width / scale);
//            //把图片绘制到canvas上面
//            console.log(canvas.height)
//            context.drawImage(image, 0, 0, canvas.width, canvas.height);
//            //压缩图片，获取到新的base64Url
//            var newImageData = canvas.toDataURL(fileType,param.quality);
//            //将base64转化成文件流
//            var resultFile = _this.dataURLtoFile(newImageData,param.fileName);
//            //判断如果targetSize有限制且压缩后的图片大小比目标大小大，就弹出错误
//            if(param.targetSize != -1 && param.targetSize < resultFile.size){
//              console.log(param.targetSize);
//              console.log(resultFile.size);

//              console.log("图片上传尺寸太大，请重新上传^_^");
//              param.succ(null);
//            }else{
//              //返回文件流
//              param.succ(resultFile);
//            }
//          }
//        }
//      });
//    }
//  },
        //图片压缩处理
        fileToImg(file){
            let that = this;
            let options = {
                width:200,
                height:200,
            }
            const render = new FileReader();
            render.readAsDataURL(file);  //将file转为base64
            render.onload = function(e){
                let img = new Image();
                    img.src = e.target.result;
                img.onload = function(){
                    const { width:naturalWidth, height:naturalHeight} = img;
                    that.size = file.size
                    that.width = naturalWidth
                    that.height = naturalHeight
                    that.name = file.name
                    //生成canvas
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    var aspectRatio = naturalWidth / naturalHeight; //真实宽高比
                    var width = Math.max(options.width, 0) || naturalWidth;
                    var height = Math.max(options.height, 0) || naturalHeight;
                    if (height * aspectRatio > width) {
                        height = width / aspectRatio;
                    } else {
                        width = height * aspectRatio;
                    }
                    canvas.width = width || naturalWidth;
                    canvas.height = height || naturalHeight;
                    // 清除画布
                    // ctx.clearRect(0, 0, targetWidth, targetHeight);
                    // 图片压缩
                    console.log(canvas.width)
                    console.log(canvas.height)
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    var base64 = canvas.toDataURL('image/jpeg', 0.5);
                    /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/jpeg';
                    * qualityArgument表示导出的图片质量，只要导出为jpg和webp格式的时候此参数才有效果，默认值是0.92*/
                    var resultFile = that.dataURLtoFile(base64,"666"+file.name);
                                that.srcs2 = URL.createObjectURL(resultFile);  //页面图片回显

                    console.log(resultFile);
                }
            }
        },
        getFile(e){
            let file = e.target.files[0];
            if(file.type.indexOf('image') <= -1){
                this.$refs.files.value = ""
                this.$message('error',"仅可上传图片文件");
                return;
            }
            this.srcs = URL.createObjectURL(file);  //页面图片回显
            this.fileToImg(file);
            let that = this;
            pressImg({
                file:file,
                targetSize:1024 * 10,
                quality:0.1,
                width:200,
                succ:function(resultFile){
                    //如果不是null就是压缩成功
                    if(resultFile){
                        that.srcs3 = URL.createObjectURL(resultFile);  //页面图片回显
                        console.log(resultFile)
                    }
                }
            })
        }   
    },
}
</script>