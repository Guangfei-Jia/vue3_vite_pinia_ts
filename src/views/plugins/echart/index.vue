<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-12-10 10:27:52
 * @LastEditors: fei
 * @LastEditTime: 2022-07-31 10:59:02
-->
<template>
  <div
    class="outers"
    :style="{
      background: 'url(' + require('@/assets/imgs/mapbg.png') + ')',
    }"
  >
    <p class="systemTitle">
      地图
    </p>
    <div class="caseCount">
      <div class="caseContent opticys"></div>
      <div class="caseContent">
        <div class="title">统计</div>
        <div class="content">
          <div class="flexCenter">
            <div class="contentTitle">案件</div>
            <div class="contentValue">
              <div class="val">111</div>
              <div class="item">件</div>
            </div>
          </div>
          <div class="flexCenter">
            <div class="contentTitle">案件</div>
            <div class="contentValue">
              <div class="val">111</div>
              <div class="item">件</div>
            </div>
          </div>
          <div class="flexCenter">
            <div class="contentTitle">案件</div>
            <div class="contentValue">
              <div class="val">222</div>
              <div class="item">件</div>
            </div>
          </div>
          <div class="flexCenter">
            <div class="contentTitle">案件</div>
            <div class="contentValue">
              <div class="val">333</div>
              <div class="item">件</div>
            </div>
          </div>
          <div class="flexCenter">
            <div class="contentTitle">案件</div>
            <div class="contentValue">
              <div class="val">4445544</div>
              <div class="item">件</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="myEcharts" style="width:900px;height:900px;margin:0 auto;"></div>
    <div style="">
      <order-chart />
      <order-chart2 />
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import * as echarts from "echarts";
import OrderChart from "./components/order.vue";
import OrderChart2 from "./components/order2.vue";
let chinajson = require("@/assets/china.json");

const mapCenter = {
  shanghai: { showChild: false },
  beijing: { showChild: false },
  tianjin: { showChild: false },
  chongqing: {
    center: [108.037518, 30.291537],
    layoutSize: "2200",
    showChild: true,
  },
  hebei: {
    center: [116.704441, 39.523927],
    layoutSize: "1800",
    showChild: true,
  },
  henan: {
    center: [113.826063, 34.022956],
    layoutSize: "1500",
    showChild: true,
  },
  yunnan: {
    center: [101.546046, 25.041988],
    layoutSize: "1500",
    showChild: true,
  },
  liaoning: {
    center: [123.18152, 41.269402],
    layoutSize: "2000",
    showChild: true,
  },
  heilongjiang: {
    center: [128.899396, 47.724775],
    layoutSize: "1500",
    showChild: true,
  },
  hunan: {
    center: [112.008497, 27.728136],
    layoutSize: "1400",
    showChild: true,
  },
  anhui: {
    center: [117.283042, 31.86119],
    layoutSize: "1400",
    showChild: true,
  },
  shandong: {
    center: [119.107078, 36.70925],
    layoutSize: "1800",
    showChild: true,
  },
  xinjiang: {
    center: [85.501218, 41.827251],
    layoutSize: "1300",
    showChild: true,
  },
  jiangsu: {
    center: [120.139998, 33.377631],
    layoutSize: "1600",
    showChild: true,
  },
  zhejiang: {
    center: [120.649506, 29.089524],
    layoutSize: "1400",
    showChild: true,
  },
  jiangxi: {
    center: [115.930835, 27.810834],
    layoutSize: "1000",
    showChild: true,
  },
  hubei: {
    center: [112.204251, 31.03542],
    layoutSize: "1400",
    showChild: true,
  },
  guangxi: {
    center: [109.229772, 23.733766],
    layoutSize: "1600",
    showChild: true,
  },
  gansu: {
    center: [102.634697, 37.929996],
    layoutSize: "1200",
    showChild: true,
  },
  shanxi: {
    center: [108.948024, 35.263161],
    layoutSize: "1200",
    showChild: true,
  },
  neimenggu: {
    center: [114.090996, 43.944018],
    layoutSize: "800",
    showChild: true,
  },
  shanxi1: {
    center: [112.549248, 37.857014],
    layoutSize: "1600",
    showChild: true,
  },
  jilin: {
    center: [126.55302, 43.843577],
    layoutSize: "2000",
    showChild: true,
  },
  fujian: {
    center: [118.635001, 26.265444],
    layoutSize: "1000",
    showChild: true,
  },
  guizhou: {
    center: [106.713478, 26.578343],
    layoutSize: "1800",
    showChild: true,
  },
  guangdong: {
    center: [113.280637, 23.125178],
    layoutSize: "1400",
    showChild: true,
  },
  qinghai: {
    center: [96.619542, 36.280353],
    layoutSize: "1600",
    showChild: true,
  },
  xizang: {
    center: [90.060214, 31.476004],
    layoutSize: "1400",
    showChild: true,
  },
  sichuan: {
    center: [104.065735, 30.659462],
    layoutSize: "1400",
    showChild: true,
  },
  ningxia: {
    center: [106.199409, 36.986165],
    layoutSize: "2000",
    showChild: true,
  },
  hainan: {
    center: [109.839996, 19.03557],
    layoutSize: "4000",
    showChild: true,
  },
  taiwan: { showChild: false },
  xianggang: { showChild: false },
  aomen: { showChild: false },
  dalian: { showChild: false },
  suzhou: { showChild: false },
  ningbo: { showChild: false },
  xiamen: { showChild: false },
  qingdao: { showChild: false },
  shenzhen: { showChild: false },
  nanhai: { showChild: false },
};
// Vue.prototype.$echarts = echarts;
export default defineComponent({
  components: { OrderChart, OrderChart2 },
  setup() {
    let chinaMapChart = null;

    const myChart1 = ref(null);
    const randomData = function() {
      return Math.round(Math.random() * 1000);
    };
    const initLin = () => {
      let chartDom = document.getElementById("leftCanvas");
      let myChart = echarts.init(chartDom);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Email",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "bar",
            stack: "Ad",
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Search Engine",
            type: "bar",
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: "series",
            },
            markLine: {
              lineStyle: {
                type: "dashed",
              },
              data: [[{ type: "min" }, { type: "max" }]],
            },
          },
          {
            name: "Baidu",
            type: "bar",
            barWidth: 5,
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
          },
          {
            name: "Google",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 290, 230, 220],
          },
          {
            name: "Bing",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [60, 72, 71, 74, 190, 130, 110],
          },
          {
            name: "Others",
            type: "bar",
            stack: "Search Engine",
            emphasis: {
              focus: "series",
            },
            data: [62, 82, 91, 84, 109, 110, 120],
          },
        ],
      };
      myChart.setOption(option);
    };

    const initCircle = () => {
      var ROOT_PATH =
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples";

      var chartDom = document.getElementById("rightCanvas");
      var myChart = echarts.init(chartDom);
      var option;

      var _panelImageURL = ROOT_PATH + "/data/asset/img/custom-gauge-panel.png";
      var _animationDuration = 1000;
      var _animationDurationUpdate = 1000;
      var _animationEasingUpdate = "quarticInOut";
      var _valOnRadianMax = 200;
      var _outerRadius = 200;
      var _innerRadius = 170;
      var _pointerInnerRadius = 40;
      var _insidePanelRadius = 140;
      var _currentDataIndex = 0;
      function renderItem(params, api) {
        var valOnRadian = api.value(1);
        var coords = api.coord([api.value(0), valOnRadian]);
        var polarEndRadian = coords[3];
        var imageStyle = {
          image: _panelImageURL,
          x: params.coordSys.cx - _outerRadius,
          y: params.coordSys.cy - _outerRadius,
          width: _outerRadius * 2,
          height: _outerRadius * 2,
        };
        return {
          type: "group",
          children: [
            {
              type: "image",
              style: imageStyle,
              clipPath: {
                type: "sector",
                shape: {
                  cx: params.coordSys.cx,
                  cy: params.coordSys.cy,
                  r: _outerRadius,
                  r0: _innerRadius,
                  startAngle: 0,
                  endAngle: -polarEndRadian,
                  transition: "endAngle",
                  enterFrom: { endAngle: 0 },
                },
              },
            },
            {
              type: "image",
              style: imageStyle,
              clipPath: {
                type: "polygon",
                shape: {
                  points: makePionterPoints(params, polarEndRadian),
                },
                extra: {
                  polarEndRadian: polarEndRadian,
                  transition: "polarEndRadian",
                  enterFrom: { polarEndRadian: 0 },
                },
                during: function(apiDuring) {
                  apiDuring.setShape(
                    "points",
                    makePionterPoints(
                      params,
                      apiDuring.getExtra("polarEndRadian")
                    )
                  );
                },
              },
            },
            {
              type: "circle",
              shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r: _insidePanelRadius,
              },
              style: {
                fill: "#fff",
                shadowBlur: 25,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: "rgba(76,107,167,0.4)",
              },
            },
            {
              type: "text",
              extra: {
                valOnRadian: valOnRadian,
                transition: "valOnRadian",
                enterFrom: { valOnRadian: 0 },
              },
              style: {
                text: makeText(valOnRadian),
                fontSize: 50,
                fontWeight: 700,
                x: params.coordSys.cx,
                y: params.coordSys.cy,
                fill: "rgb(0,50,190)",
                align: "center",
                verticalAlign: "middle",
                enterFrom: { opacity: 0 },
              },
              during: function(apiDuring) {
                apiDuring.setStyle(
                  "text",
                  makeText(apiDuring.getExtra("valOnRadian"))
                );
              },
            },
          ],
        };
      }
      function convertToPolarPoint(renderItemParams, radius, radian) {
        return [
          Math.cos(radian) * radius + renderItemParams.coordSys.cx,
          -Math.sin(radian) * radius + renderItemParams.coordSys.cy,
        ];
      }
      function makePionterPoints(renderItemParams, polarEndRadian) {
        return [
          convertToPolarPoint(renderItemParams, _outerRadius, polarEndRadian),
          convertToPolarPoint(
            renderItemParams,
            _outerRadius,
            polarEndRadian + Math.PI * 0.03
          ),
          convertToPolarPoint(
            renderItemParams,
            _pointerInnerRadius,
            polarEndRadian
          ),
        ];
      }
      function makeText(valOnRadian) {
        // Validate additive animation calc.
        if (valOnRadian < -10) {
          alert("illegal during val: " + valOnRadian);
        }
        return ((valOnRadian / _valOnRadianMax) * 100).toFixed(0) + "%";
      }
      option = {
        animationEasing: _animationEasingUpdate,
        animationDuration: _animationDuration,
        animationDurationUpdate: _animationDurationUpdate,
        animationEasingUpdate: _animationEasingUpdate,
        dataset: {
          source: [[1, 156]],
        },
        tooltip: {},
        angleAxis: {
          type: "value",
          startAngle: 0,
          show: false,
          min: 0,
          max: _valOnRadianMax,
        },
        radiusAxis: {
          type: "value",
          show: false,
        },
        polar: {},
        series: [
          {
            type: "custom",
            coordinateSystem: "polar",
            renderItem: renderItem,
          },
        ],
      };
      // setInterval(function () {
      //   var nextSource = [[1, Math.round(Math.random() * _valOnRadianMax)]];
      //   myChart.setOption({
      //     dataset: {
      //       source: nextSource
      //     }
      //   });
      // }, 3000);

      option && myChart.setOption(option);
    };
    const setFL = () => {
      var chartDom = document.getElementById("rightCanvas");
      var myChart = echarts.init(chartDom);
      var nextSource = [[1, Math.round(Math.random() * 200)]];
      myChart.setOption({
        dataset: {
          source: nextSource,
        },
      });
    };
    const bindClick = () => {
      chinaMapChart.off("click"); //防止触发两次点击事件
      chinaMapChart.on("click", function(params) {
        const ifNext = mapCenter[params.data.USname].showChild;
        if (ifNext) {
          //判断是否需要下钻加载数据
          const jsonData = require(`@/assets/mapJson/${params.data.USname}.json`);
          initEcharts(
            jsonData,
            mapCenter[params.data.USname].center,
            mapCenter[params.data.USname].layoutSize
          );
          // initLin();
          setFL();
        }
      });
      chinaMapChart.getZr().on("click", (res) => {
        // 空白
        //点击空白区域时触发
        if (!res.target) {
          initEcharts(chinajson, [108.548024, 34.263161]);
        }
      });
    };
    /**
     * echarts实例话
     */
    const initEcharts = function(jsons, cp, size = 600) {
      // echarts画图实例
      echarts.registerMap("china", jsons);

      // 画图区域
      chinaMapChart = echarts.init(
        document.getElementById("myEcharts"),
        "macarons"
      );
      let optionChinaMap = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            var res = "";
            res += params.name + "</br>";
            res += "用户数" + " : " + params.value + "</br>";
            return res;
          },
        },
        // legend: {
        //   orient: "vertical", //图例的排列方向
        //   textStyle: { color: "#ccc" },
        //   left:'left',
        //   show: true,
        //   // data: ['1','2','3'],
        //   // selected:{
        //   //   '1':true,
        //   //   '2':true,
        //   //   '3':true,
        //   // }
        // },

        // visualMap: {
        //   //颜色的设置  dataRange
        //   // textStyle: { color: "blue" },
        //   // x: "left",
        //   // y: "bottom",
        //   // splitList: [
        //   //     { start: 1500 },
        //   //     { start: 900, end: 1500 },
        //   //     { start: 310, end: 1000 },
        //   //     { start: 200, end: 300 },
        //   //     { start: 50, end: 200 },
        //   //     { start: 0, end: 50 }
        //   // ],
        //   // show: true,
        //   // color: [
        //   //     "#5475f5",
        //   //     "#9feaa5",
        //   //     "#3FA7FF",
        //   //     "#66E0E3",
        //   //     "#FFDC5E",
        //   //     "#9fb5ea"
        //   // ]
        //   show: false, //色系条是否显示
        //   min: 0,
        //   max: 4500, //取其区间值就代表色系inRange中的一种颜色
        //   left: "left",
        //   top: "bottom",
        //   text: ["高", "低"], // 文本，默认为数值文本
        //   calculable: true,
        //   inRange: {
        //     color: ["#fff", "blue", "red"], //上色范围
        //   },
        // },
        // roamController: {
        //   //控制地图的上下左右放大缩小
        //   show: true,
        //   x: "right",
        //   mapTypeControl: {
        //     china: true,
        //   },
        // },
        series: [
          {
            name: "全国数据",
            type: "map",
            center: cp.length > 0 ? cp : "",
            mapType: "china",
            showLegendSymbol: false,
            zoom: 1.4, //地图大小
            // roam: true, //是否开启鼠标缩放和平移漫游
            layoutCenter: ["55%", "50%"],
            layoutSize: size,
            scaleLimit: {
              min: 1,
              max: 3,
            },
            itemStyle: {
              //地图区域的多边形 图形样式
              normal: {
                shadowColor: "rgba(14,56,159)",
                shadowBlur: 8,
                // borderColor: "#fff",
                areaColor: "rgba(11,13,74)",
                // borderWidth: 1,

                //是图形在默认状态下的样式
                label: {
                  show: true,
                  textStyle: { color: "#ccc" }, //地图text样式
                },
              },
              emphasis: {
                areaColor: "#e65e3d",
                shadowColor: "#e65e3d",

                // borderWidth: 1,
                // borderColor: "yellow",
                //是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: {
                  show: true,
                  textStyle: { color: "#fff" }, //地图text样式
                },
              },
            },
            top: "100", //组件距离容器的距离

            data: [
              { name: "上海市", USname: "shanghai", value: randomData() },
              { name: "北京市", USname: "beijing", value: "100" },
              { name: "天津市", USname: "tianjin", value: randomData() },
              { name: "重庆市", USname: "chongqing", value: randomData() },
              { name: "河北省", USname: "hebei", value: randomData() },
              { name: "河南省", USname: "henan", value: randomData() },
              { name: "云南省", USname: "yunnan", value: randomData() },
              { name: "辽宁省", USname: "liaoning", value: randomData() },
              { name: "黑龙江省", USname: "heilongjiang", value: randomData() },
              { name: "湖南省", USname: "hunan", value: randomData() },
              { name: "安徽省", USname: "anhui", value: randomData() },
              { name: "山东省", USname: "shandong", value: randomData() },
              {
                name: "新疆维吾尔自治区",
                USname: "xinjiang",
                value: randomData(),
              },
              { name: "江苏省", USname: "jiangsu", value: randomData() },
              { name: "浙江省", USname: "zhejiang", value: randomData() },
              { name: "江西省", USname: "jiangxi", value: randomData() },
              { name: "湖北省", USname: "hubei", value: randomData() },
              {
                name: "广西壮族自治区",
                USname: "guangxi",
                value: randomData(),
              },
              { name: "甘肃省", USname: "gansu", value: randomData() },
              { name: "山西省", USname: "shanxi1", value: randomData() },
              {
                name: "内蒙古自治区",
                USname: "neimenggu",
                value: randomData(),
              },
              { name: "陕西省", USname: "shanxi", value: randomData() },
              { name: "吉林省", USname: "jilin", value: randomData() },
              { name: "福建省", USname: "fujian", value: randomData() },
              { name: "贵州省", USname: "guizhou", value: randomData() },
              { name: "广东省", USname: "guangdong", value: randomData() },
              { name: "青海省", USname: "qinghai", value: randomData() },
              { name: "西藏自治区", USname: "xizang", value: randomData() },
              { name: "四川省", USname: "sichuan", value: randomData() },
              {
                name: "宁夏回族自治区",
                USname: "ningxia",
                value: randomData(),
              },
              { name: "海南省", USname: "hainan", value: randomData() },
              { name: "台湾省", USname: "taiwan", value: randomData() },
              {
                name: "香港特别行政区",
                USname: "xianggang",
                value: randomData(),
              },
              { name: "澳门特别行政区", USname: "aomen", value: randomData() },
              { name: "南海诸岛", USname: "nanhai", value: randomData() },
              { name: "深圳市", USname: "shenzhen", value: randomData() },
              { name: "大连市", USname: "dalian", value: randomData() },
              { name: "苏州市", USname: "suzhou", value: randomData() },
              { name: "厦门市", USname: "xiamen", value: randomData() },
              { name: "青岛市", USname: "qingdao", value: randomData() },
              { name: "宁波市", USname: "ningbo", value: randomData() },
            ],
          },
        ],
      };
      chinaMapChart.setOption(optionChinaMap, true);
    };

    onMounted(() => {
      initEcharts(chinajson, [108.548024, 34.263161]);
      bindClick();
      initCircle();
    });
    return {};
  },
});
</script>

<style lang="scss" scoped>
.outers {
  display: flex;
  width: 100vw;
  height: 100%;
  background-color: rgb(91, 129, 187);
  align-items: center;
  min-width: 1400px;
  background-size: 100% 100%;
}
.systemTitle {
  color: #fff;
  position: absolute;
  top: 1%;
  width: 100%;
  text-align: center;
  font-size: 2.4rem;
}
.caseCount {
  font-size: 16rem;
  color: blue;
  position: absolute;
  top: 0;
  left: 0;
  margin: 1%;
  width: 33%;
  height: 18%;
  min-height:17rem;
  z-index: 999;
  .opticys {
    opacity: 0.5;
    background-color: rgba(11, 13, 74);
    box-shadow: 1px 1px 5px #fff, -1px -1px 5px #fff;
    border-radius: 5px;
  }
  .caseContent {
    width: 100%;
    height: 100%;
    position: absolute;
    .title {
      color: #fff;
      font-size: 1.6rem;
      text-align: center;
      line-height: 5rem;
      height: 5rem;
      font-weight: bold;
    }
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .flexCenter {
        text-align: center;
      }
      .contentTitle {
        color: #fff;
        font-size: 1.4rem;
        margin-bottom: 0.8rem;
      }
      .contentValue {
        width: 6rem;
        height: 6rem;
        border-radius: 3rem;
        background-color: #fff;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 1.4rem;
        position: relative;
        .val {
          text-align: center;
        }
        .item {
          font-size: 1.2rem;
          bottom: 0.5rem;
          position: absolute;
        }
      }
    }
  }
}
</style>
