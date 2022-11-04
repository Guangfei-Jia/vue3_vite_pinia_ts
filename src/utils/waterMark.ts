/*
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-08-24 09:17:44
 * @LastEditors: fei
 * @LastEditTime: 2021-12-22 15:08:56
 */
import { getStore } from './storage';

const watermark = {
    set: function (text1: any, text2: any) {
        var canvas = document.createElement('canvas')
        canvas.width = 180;
        canvas.height = 180;
        canvas.style.display = 'none';
        var shuiyin: any = canvas.getContext('2d');
        // 控制文字的旋转角度和上下位置
        shuiyin.rotate(-40 * Math.PI / 180);
        shuiyin.translate(-50, 20)
        //文字颜色
        shuiyin.fillStyle = "#cfcfcf";
        //文字样式
        shuiyin.font = "100 16px Microsoft JhengHei ";
        shuiyin.fillText(text1, canvas.width / 3, canvas.height / 2);
        shuiyin.fillText(text2, canvas.width / 3, canvas.height / 2 + 20);
        /* 新建一个用于填充canvas水印的标签，之所以没有直接在body上添加，
           是因为z-index对个别内容影响，才考虑的不用body */
        var watermark = document.createElement('div')
        const styleStr = `
            opacity:0.8;
            position:fixed;
            top:0;
            left:0;
            width:100vw;
            height:100vh;
            z-index:99;
            pointer-events:none;
            background-repeat:repeat;
            mix-blend-mode: multiply;
            background-image:url('${canvas.toDataURL("image/png")}')`;
        watermark.setAttribute('style', styleStr);
        watermark.classList.add('watermark')
        document.body.appendChild(watermark)

        //此方法是防止用户通过控制台修改样式去除水印效果
        /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
        const observer = new MutationObserver(() => {
            const wmInstance = document.querySelector('.watermark');
            if ((wmInstance && wmInstance.getAttribute('style') !== styleStr) || !wmInstance) {
                //如果标签在，只修改了属性，重新赋值属性
                if (wmInstance) {
                    // 避免一直触发
                    // observer.disconnect();
                    console.log('水印属性修改了');
                    wmInstance.setAttribute('style', styleStr);
                } else {
                    /* 此处根据用户登录状态，判断是否终止监听，避免用户退出后登录页面仍然有水印 */
                    let token = getStore('tokens');
                    if (token) {
                        //标签被移除，重新添加标签
                        console.log('水印标签被移除了');
                        document.body.appendChild(watermark)
                    } else {
                        observer.disconnect();
                    }
                }
            }
        })
        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            childList: true,
        });
    },
    close: function () {
        /* 关闭页面的水印，即要移除水印标签 */
        let watermark: any = document.querySelector('.watermark')
        if (watermark) {
            document.body.removeChild(watermark)
        }
    }
}
export default watermark;