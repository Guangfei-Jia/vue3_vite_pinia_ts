import { ElMessage } from 'element-plus';
import { menuInterface, canvasImgInterface } from '../utils/interface'

const modules = import.meta.glob('../views/*/*/*.vue');
// // 上面的结果是一个对象，相当于
// const modules ={
//     "../views/daily/index.vue": () => import("/src/views/daily/index.vue")
// }
/**
 * 判断客户端返回状态
 * @param res
 * @param show_msg
 * @returns {boolean}
 */
export const checkResponse: (res: any, show_msg?: boolean) => boolean = (res: any, show_msg = false): boolean => {
  const { code, message: msg } = res;
  if (code !== 0) {
    message('error', msg)
    return false;
  } else {
    if (show_msg) {
      message('success', msg)
    }
    return true;
  }
};

/**
 * 判断token是否已经过期
 * @param timeStamp
 * @returns {boolean}
 */
export const isTokenExpired: (timeStamp: any) => boolean = (timeStamp: any): boolean => {
  let expiredTime = timeStamp;
  /*获取本地时间*/
  let nowTime = new Date().getTime() / 1000;
  /*token过期时间小于当前时间，证明已经过期*/
  return expiredTime < nowTime;
};

/**
 * 判断token是否即将过期
 * @param timeStamp
 * @returns {boolean}
 */
export const isTokenWillExpired: (timeStamp: any) => boolean = (timeStamp: any): boolean => {
  let expiredTime = timeStamp;
  /*获取本地时间*/
  let nowTime = new Date().getTime() / 1000;
  /*如果 < 10分钟，则说明即将过期*/
  return (expiredTime - nowTime) < 60 * 10;
};

/**
 * 创建路由对象
 * @returns {object}
 * @param data
 */
export const createRoute = (data: menuInterface): any => {
  let path = data.router_url;
  if (data.router_param) {
    path += '/' + data.param;
  }
  let filePath = data.router_url;
  return {
    name: data.name,
    path: path,
    component: modules[`../views${filePath}/index.vue`],
    // component: () => import(`@/views${filePath}/index.vue`),
    // (resolve:any) => require(['@/views' + filePath + ".vue"], resolve),
    meta: { model: data.parent_id, info: data, id: data.id },
  };
};

/**
 * 重置message弹窗
 * @param {类型} type 
 * @param {信息内容} msg 
 */
export const message = (type: any, msg: string) => {
  return ElMessage({
    type: type,
    showClose: true,
    message: msg
  })
}

//生成范围内随机数
export const getRandom: (min: number, max: number) => number = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
}

//判断当前图片url是否有效
export const imgExist: (url: string) => Promise<boolean> = (url: string): Promise<boolean> => {
  return new Promise(resolve => {
    let img = new Image();
    img.onload = function (e) {
      if ((<any>this).complete == true) {
        console.log("资源加载");
        resolve(true);
        img = null as unknown as HTMLImageElement; //释放img占用空间
      }
    }
    img.onerror = function () {
      console.log(`资源错误：${img}`);
      resolve(false);
      img = null as unknown as HTMLImageElement;
    }
    img.src = url;
  })
}

//过滤对象中为空的属性
export const filterObj: (obj: any) => object = (obj: any): any => {
  if (!(typeof obj == 'object')) {
    return {};
  }
  for (var key in obj) {
    if (obj[key] == null || obj[key] === '' || obj[key] == 'undefined') {
      delete obj[key];
    }
  }
  return obj;
}
//过滤对象中为空的属性
export const filterObjForobj: (obj: any) => object = (obj: any): any => {
  if (!(typeof obj == 'object')) {
    return {};
  }
  for (var key in obj) {
    if ((<any>obj).hasOwnPropty(key + '') && (obj[key] == null || obj[key] === '' || obj[key] == 'undefined')) {
      delete obj[key];
    }
  }
  return obj;
}
/**
* 将base64转换为文件
* @param {baseURL} dataurl 
* @param {文件名称} filename 
* @return {文件二进制流}
*/
export const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
/**
* canvas压缩图片
* @param {参数obj} obj 
* @param {文件二进制流} obj.file 必传
* @param {目标压缩大小} obj.targetSize
* @param {输出图片宽度} obj.width 不传初始赋值-1，等比缩放不用传高度
* @param {输出图片名称} obj.fileName 不传初始赋值image
* @param {压缩图片程度} obj.quality 不传初始赋值0.92。值范围0~1
* @param {回调函数} obj.succ 必传
*/
export const pressImg = function (obj: canvasImgInterface) {
  //存在回调函数再执行
  if (obj && obj.succ) {
    //如果file没定义返回null
    if (obj.file == undefined) return obj.succ(null);
    // 判断文件类型
    var fileType = obj.file.type;
    if (fileType.indexOf("image") == -1) {
      console.log('请选择图片文件^_^');
      return obj.succ(null);
    };
    //判断上传的图片的大小是否小于最大限制，超出限制时才压缩
    var size = obj.file.size;
    if (obj.targetSize > size) {
      return obj.succ(obj.file);
    }
    let oldSize = {
      width: 0,
      height: 0
    };   //保存原始的尺寸数据
    const render = new FileReader();
    render.readAsDataURL((obj as any).file);  //将file转为base64
    render.onload = function (e) {
      //创建图片元素
      let image = new Image();
      image.src = (<any>e.target).result;
      image.onload = function () {
        //获取图片原始的尺寸
        const { width: naturalWidth, height: naturalHeight } = image;
        oldSize.width = naturalWidth;
        oldSize.height = naturalHeight;
        const scale = naturalWidth / naturalHeight; //宽高比
        let canvas = document.createElement("canvas");
        let context = canvas.getContext('2d');
        canvas.width = obj.width == -1 ? naturalWidth : obj.width;
        canvas.height = obj.width == -1 ? naturalHeight : Math.round(obj.width / scale);
        (<any>context).drawImage(image, 0, 0, canvas.width, canvas.height);    //绘制canvas图
        var newImageData = canvas.toDataURL(fileType, obj.quality);    //按照压缩比例压缩图片，获取到新的base64数据
        let resultFile = dataURLtoFile(newImageData, newImageData);     //base64转换为文件
        //如果targetSize有限制，压缩后的图片大小比限制的大小大，报告错误
        if (obj.targetSize != -1 && obj.targetSize < resultFile.size) {
          console.log("图片上传尺寸太大，请重新上传^_^");
          obj.succ(null);
        } else {
          //返回文件流
          obj.succ(resultFile);
        }
      }
    }
  }
}

//图标动画类
export class Ani {
  private x;
  private y;
  private width;
  private height;
  private image;
  private step;
  private spite;
  private frequency;
  private op;
  private type;
  private dy;
  constructor(img: object, x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = img;
    //随机生成正弦曲线的波动幅度
    this.step = getRandom(10, 60);
    //随机生成y轴的移动速度
    this.spite = getRandom(2, 6);
    this.frequency = getRandom(50, 100);
    //小图标透明度
    this.op = 0;
    //随机曲线类型
    Math.random() >= 0.5 ? this.type = 1 : this.type = 2;
    this.dy = 0;
  }
  draw(context: { drawImage: (arg0: object, arg1: number, arg2: number, arg3: number, arg4: number) => void; fillStyle: string; fillRect: (arg0: number, arg1: number, arg2: number, arg3: number) => void; }) {
    //y轴动画效果
    this.y -= this.spite;
    //x轴动画效果 
    this.dy += this.spite;
    let dx = 0;
    //不同的波动方向
    this.type == 1 ? dx = Math.sin(this.dy / this.frequency) : dx = Math.sin(-this.dy / this.frequency);
    let x = this.x + dx * this.step;
    //图像放大动画
    if (this.width < 50) {
      this.width += 0.5;
      this.height += 0.5;
    }
    context.drawImage(this.image, x, this.y, this.width, this.height);
    //图像消失动画，透明度从0-1
    if (this.y < 50) {
      this.op += 0.05
      context.fillStyle = `rgba(255,255,111,${this.op})`;
      context.fillRect(x, this.y, this.width, this.height);
    }
  }
}



// function getRandom(min, max){
//     return min + Math.random() * max;
// }

export class Press1 {
  private x;
  private y;
  private width;
  private height;
  private image;
  private step;
  private spite;
  private frequency;
  private op;
  private type;
  private dy;
  constructor(img: object, x: number, y: number, w: number, h: number) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.image = img;
    //随机生成正弦曲线的波动幅度
    this.step = getRandom(10, 60);
    //随机生成y轴的移动速度
    this.spite = getRandom(2, 6);
    //正弦函数的摆动频率
    this.frequency = getRandom(50, 100);
    //小图标透明度
    this.op = 0;
    //随机曲线类型
    Math.random() >= 0.5 ? this.type = 1 : this.type = 2;
    //y轴偏移量，作为正弦函数的参数
    this.dy = 0;
  }
  //这里不用全局的context是为了方便复用
  draw(context: { drawImage: (arg0: any, arg1: any, arg2: any, arg3: any, arg4: any) => void; fillStyle: string; fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; }) {
    //y轴平移动画
    this.y -= this.spite;
    //x轴摆动动画
    this.dy += this.spite;
    let dx = 0;
    //不同的波动方向
    this.type == 1 ? dx = Math.sin(this.dy / this.frequency) : dx = Math.sin(-this.dy / this.frequency);
    let x = this.x + dx * this.step;
    //放大动画
    if (this.width < 50) {
      this.width += 0.5;
      this.height += 0.5;
    }
    context.drawImage(this.image, x, this.y, this.width, this.height);
    //消失时的透明度动画
    if (this.y < 50) {
      this.op += 0.05
      context.fillStyle = `rgba(255,255,255,${this.op})`;
      context.fillRect(x, this.y, this.width, this.height);
    }
  }
}