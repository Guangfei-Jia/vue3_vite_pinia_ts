<template>
    <canvas @click="tapAdd" ref="canvas" id="canvas" width="250" height="500"></canvas>
</template>
<script>
import { getRandom, Ani } from "@/utils/utils"

export default {
    data () {
        return {
            imagesList:[
                require("../../../assets/imgs/heart.png"),
                require("../../../assets/imgs/dog.png"),
                require("../../../assets/imgs/cat.png"),
                require("../../../assets/imgs/star.png"),
                require("../../../assets/imgs/zan.png"),
            ],
            promiseList:[], //图片promise集合
            drawingList:[], //绘图集合
            context:null,   //canvas上下文
        }
    },
    mounted () {
        let that = this;
        this.context = this.$refs.canvas.getContext('2d');
        this.loadImage().then(() => {
            console.log("图片准备完毕")
            that.render();
        });
    },
    methods:{
        //预加载点赞图图片
        loadImage(){
           let that = this;
           this.imagesList.forEach(element => {
               let p=new Promise((resolve)=>{
                   const img=new Image();
                   img.onload=resolve.bind(null,img)
                   img.src=element;
               })
               that.promiseList.push(p)
           });
           return new Promise(resolve=>{
               Promise.all(that.promiseList).then(imgs=>{   
                    this.imagesList=imgs;
                    resolve();
               })
           })
        },
        //渲染函数
        render(){
           let that = this;
        //    this.context.clearRect(0,0,250,500); // clear canvas
           this.context.fillStyle = 'rgba(255,255,111,0.5)';
           this.context.fillRect(0,0,250,500);

           this.drawingList.forEach((ani,index)=>{
               if(ani.y<-50){
                   ani=null;
               }else{
                   ani.draw(that.context);
               }
           })
        //    console.log(this.drawingList)

           let timer = window.requestAnimationFrame(that.render)
        //    cancelAnimationFrame(timer);
        },
        //添加图标
        tapAdd(){
           let image = this.imagesList[ getRandom(0,5) ];
           let ani = new Ani(image, 250/2-50/2,500-50,20,20)
           this.drawingList.push(ani)
        }
    }
}
</script>