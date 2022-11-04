<!--
 * @Descripttion: 
 * @version: 
 * @Author: fei
 * @Date: 2021-12-23 10:47:08
 * @LastEditors: fei
 * @LastEditTime: 2021-12-24 10:10:56
-->
<template>
<div class="styl-wrap">
   <div class="styl opticys"></div>
  <div class="styl" id="orderChart2"></div>
</div>
</template>

<script>
import * as echarts from "echarts";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  setup() {
    const initList = () => {
      var chartDom = document.getElementById("orderChart2");
      var myChart = echarts.init(chartDom);
      const data = [];
      for (let i = 0; i < 7; ++i) {
        data.push(Math.round(Math.random() * 200));
      }
      let option = {
        title: {
            left: 'center',
            top:'3%',
            text: '投诉率排名',
            textStyle: { color: "#fff" },
        },
         tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          data: ["广东嘉得信分公司", "广东嘉得信分公司3333", "黑龙江啥也不是公司", "你才我是哪个分行的", "宁波皮革厂", "第七个公司", "第八个"],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
          max: 6, // only the largest 3 bars will be displayed
        },
        grid:{
            left:"2%",
            right:"10%",
            bottom:"10%",
            containLabel:true,
        },
        textStyle: { color: "#fff" },
        series: [
          {
            realtimeSort: true,
            type: "bar",
            data: data,
            
            itemStyle: {
                textStyle: { color: "red" },
              color: function(param) {
                console.log(param.dataIndex);
                switch (param.dataIndex) {
                  case 0:
                    return "rgba(147,244,217)";
                    break;
                  case 1:
                    return "green";
                    break;
                  case 2:
                    return "rgba(147,244,217)";
                    break;
                  default:
                    return "rgba(147,244,217)";
                  // code
                }
              },
            },
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
              textStyle: {
                color: "#fff",
              }
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 0,
        animationDurationUpdate: 2000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
      function run() {
        for (var i = 0; i < data.length; ++i) {
          if (Math.random() > 0.9) {
            data[i] += Math.round(Math.random() * 1000);
          } else {
            data[i] += Math.round(Math.random() * 200);
          }
        }
        myChart.setOption({
          series: [
            {
              type: "bar",
              data,
            },
          ],
        });
      }
      setTimeout(function() {
        run();
      }, 0);
      setInterval(function() {
        run();
      }, 3000);
      option && myChart.setOption(option);
    };
    onMounted(initList);
  },
});
</script>
<style lang="scss" scoped>
.styl-wrap{
  width: 33%;
  height: 33%;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index:999;
  margin: 1%;
  .opticys{
    opacity: 0.5;
    background-color: rgba(11, 13, 74);
      box-shadow: 1px 1px 5px #fff,
                    -1px -1px 5px #fff;
    border-radius: 5px;
  }
  .styl {
    width: 100%;
    height: 100%;
    position: absolute;
    }
}
</style>
