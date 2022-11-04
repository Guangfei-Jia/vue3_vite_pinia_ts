<template>
    <div style="width:100%">
        <button @click="add" style="margin-left:200px">添加节点</button>
        <div id="relation"></div>

        <div id="w">
            <div id="moon"></div>
            <span class="spans">567</span>
            <p></p>
            <p></p>
            <p></p> 
        </div>
    </div>
</template>

<script>
// import * as d3 from 'd3';    //全局引入
//按需引入
// var d3Selection = require("d3-selection");
var d3 = Object.assign({}, require("d3-selection"), require("d3-zoom"), require("d3-force"), require("d3-scale"), require("d3-drag"));
var defaultConfig = {
    width:800,                  // 默认尺寸:宽
    height:600,                 // 默认尺寸：高
    chargeStrength: 0,          // 万有引力大小，正值为引力、负值为斥力
    collide: 80,                // 碰撞力的大小 （节点之间的间距）不重叠半径
    strength: 0.2,              // 碰撞力强度
    iterations: 5,              // 碰撞力迭代次数
    alphaDecay: 0.0228,         // 控制力学模拟衰减率；最小值0.001，值越大冷却越快，越小布局效果越好
    linkSrc: 30,                // 划线时候的弧度
}
export default {
    data () {
        return {
            config: {},
            map: null,           // 画布
            simulation: null,    // 力学模拟器
            svg:null,            // 图形
            svg_edges: null,
            svg_nodes: null,
            svg_texts: null,
            edgelabels: null,
            linksText:null,
            links: null,
            texts: null,
            
            nodesData:[ { name: "桂林" }, { name: "广州" },
                        { name: "厦门" }, { name: "杭州" },
                        { name: "上海" }, { name: "青岛" },
                        { name: "天津" } ],
            edgesData:[ { source : 0 , target: 1, realtion:"没关系" } ,
                        { source : 0 , target: 2, realtion:"有关系" } ,
                        { source : 0 , target: 3, realtion:"关系" } ,
                        { source : 1 , target: 4, realtion:"事实上关系" } ,
                        { source : 1 , target: 5, realtion:"其他关系" } ,
                        { source : 1 , target: 6, realtion:"没关系" } ],
        }
    },
    methods: {
        add(){
            this.nodesData.push({ name: "深圳" });
            this.edgesData.push({ source : 0 , target: 6 });
        //     this.initMap();
        // this.initRelation();
        },
        //初始化力向关系图
        initMap(){
            let relation = '#relation';
            // 画布
            this.map = d3.select(relation);
            // 设置宽、高度
            let mapW = parseInt(d3.select(relation).style('width'));
            let mapH = parseInt(d3.select(relation).style('height'));
            let defaultWH = { width: mapW, height: mapH };  
            // 合并配置参数
            this.config = this.extend({}, defaultConfig, defaultWH);
        },
        //初始化力学关系图
        initRelation(){
            let that = this;
            // 创建不含力的力学模拟器
            this.simulation = d3.forceSimulation(this.nodesData)   
                // 添加弹簧力
                .force("link", d3.forceLink(this.edgesData))
                // 添加万有引力（电荷力），forceManyBody() 默认参数的电荷模型，strength设置力的大小
                .force("charge", d3.forceManyBody().strength(this.config.chargeStrength))
                // 添加向心力，d3.forceCenter() 根据x坐标和y坐标创建向心力模型，此处设置宽高的一半
                .force("center", d3.forceCenter(this.config.width / 2, this.config.height / 2))
                // 碰撞作用力，为节点指定一个radius区域来防止节点重叠，strength设置碰撞力的强度，范围[0,1], 默认为0.7; iterations设置迭代次数，默认为1，迭代次数越多最终的布局效果越好，但是计算复杂度更高
                .force("collide", d3.forceCollide(this.config.collide).strength(this.config.strength).iterations(this.config.iterations))
                // 在计时器的每一帧中，仿真的alpha系数会不断削减,当alpha到达一个系数时，仿真将会停止，也就是alpha的目标系数alphaTarget，该值区间为[0,1]. 默认为0，
                // 控制力学模拟衰减率，[0-1] ,设为0则不停止 ， 默认0.0228，直到0.001
                .alphaDecay(this.config.alphaDecay)
                // 监听事件 ，tick|end ，例如监听 tick 事件，力学模拟器会自动触发此事件
                .on("tick", () => this.ticked())
            //为画布添加svg绘图元素
            this.svg = this.map.append("svg")
                .attr("width", this.config.width)
                .attr("height", this.config.height);

            //添加连线 

             // 放关系图的容器
            this.svg_edges = this.svg.append("g")
                .attr("class", "svg_edges")
                .attr("width", this.config.width)
                .attr("height", this.config.height)

 this.edges = this.svg_edges
                .selectAll("g.edge")
                .data(this.edgesData)
                .enter()
                .append("g")
                .attr("class", "edge")
                .attr('fill', function (d) {
                    let str = '#bad4ed';
                    return str;
                })
// 添加线
            this.links = this.edges.append("path").attr("class", "links")
                .attr("d", d => {
                    return "M" + that.config.linkSrc + "," + 0 + " L" + that.getDis(d.source, d.target) + ",0";
                })
                // .style("marker-end", "url(#marker)")
                // .attr("refX",this.config.r)
                .attr('stroke', (d) => {
                    let str = "blue"
                    return str
                });

                 // 添加关系文字的容器
            let rect_g = this.edges.append("g")

            // 添加rect
            this.rects = rect_g.append("rect")
                .attr("x", 40)
                .attr("y", -10)
                .attr('rx', 10)
                .attr("width", (d) => {
                    return 50
                })
                .attr("height", 20)
                .attr('fill', (d) => {
                    // let str = "green"
                    return null
                })

            // 文本标签  坐标（x,y）代表 文本的左下角的点
            this.texts = rect_g.append("text");

                this.texts.attr("x", 40)
                .attr("y", 5)
                .attr("text-anchor", "middle")  // <text>文本中轴对齐方式居中  start | middle | end
                .attr('fill', 'black')
                .style("font-size", 12).text(d => {
                    return "关系123"
                });

            //添加节点
             // 放关系图的容器
            this.svg_edges2 = this.svg.append("g")
                .attr("class", "svg_edges2")
                .attr("width", this.config.width)
                .attr("height", this.config.height)

            this.svg_nodes = this.svg_edges2.selectAll("circle")
                .data(this.nodesData)
                .enter()
                .append("circle")
                .attr("r",20)
                .style("fill",function(d,i){
                    return "red";
                })
                .call(d3.drag()
                    .on('start', this.dragStart)
                    .on('drag', this.drag)
                    .on('end', this.dragEnd));  //使得节点能够拖动

            // //添加描述节点的文字
            this.svg_texts = this.svg_edges2.selectAll("text")
                .data(this.nodesData)
                .enter()
                .append("text")
                .style("fill", "green")
                .attr("dx", -12)
                .attr("dy", 45)
                .text(function(d){
                    return d.name;
                });

        },
        //扩展对象
        extend(target){
            let argument = Array.prototype.slice.call(arguments, 1);
            for (let i = 0, len = argument.length; i < len; i++){
                let obj = argument[i];
                for(let key in obj){
                    if(obj.hasOwnProperty(key)){
                        target[key] = obj[key];
                    }
                }
            }
            return target;
        },
        //节点拖动开始
        dragStart(event,d){
            event.sourceEvent.stopPropagation()
            // restart()方法重新启动模拟器的内部计时器并返回模拟器。
            // 与simulation.alphaTarget或simulation.alpha一起使用时，此方法可用于在交互
            // 过程中进行“重新加热”模拟，例如在拖动节点时，在simulation.stop暂停之后恢复模拟。
            // 当前alpha值为0，需设置alphaTarget让节点动起来
            if (!event.active) this.simulation.alphaTarget(0.3).restart()
            d.fx = d.x
            d.fy = d.y
        },
        //节点拖动中
        drag(event,d){
            // d.fx属性- 节点的固定x位置
            // 在每次tick结束时，d.x被重置为d.fx ，并将节点 d.vx设置为零
            // 要取消节点，请将节点 .fx和节点 .fy设置为空，或删除这些属性。
            d.fx = event.x
            d.fy = event.y
        },
        //节点拖动结束
        dragEnd(event,d){
            // 让alpha目标值值恢复为默认值0,停止力模型
            if (!event.active) this.simulation.alphaTarget(0)
            d.fx = null
            d.fy = null
        },
        // 求两点间的距离
        getDis (s, t) {
            return Math.sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y));
        },
        // 求元素移动到目标位置所需要的 transform 属性值
        getTransform (source, target, _dis) {
            let r
            if (target.x > source.x) {
                if (target.y > source.y) {
                    r = Math.asin((target.y - source.y) / _dis)
                } else {
                    r = Math.asin((source.y - target.y) / _dis)
                    r = -r
                }
            } else {
                if (target.y > source.y) {
                    r = Math.asin((target.y - source.y) / _dis)
                    r = Math.PI - r
                } else {
                    r = Math.asin((source.y - target.y) / _dis)
                    r -= Math.PI
                }
            }
            r = r * (180 / Math.PI)
            return "translate(" + source.x + "," + source.y + ")rotate(" + r + ")"
        },
        //力学模拟图自动触发事件
        ticked(){
            let that = this;
            // 修改关系容器的位置
            this.edges.attr("transform", function (d) {
                return that.getTransform(d.source, d.target, that.getDis(d.source, d.target))
            });
            // 修改每条线的位置
            this.links.attr("d", d => {
                return "M" + that.config.linkSrc + "," + 0 + " L" + that.getDis(d.source, d.target) + ",0";
            })
            // 修改线中关系文字text的位置 及 文字的反正
            this.texts
                .attr("x", function (d) {
                    // 更新 text 的位置
                    return that.getDis(d.source, d.target) / 2
                })
                .attr("transform", function (d) {
                    // 更新文本反正
                    if (d.target.x < d.source.x) {
                        let x = that.getDis(d.source, d.target) / 2
                        return 'rotate(180 ' + x + ' ' + 0 + ')'
                    } else {
                        return 'rotate(0)'
                    }
                });
                

            // 修改线中装文本矩形rect的位置
            this.rects
                .attr("x", function (d) {
                    // ######################
                    // return getDis(d.source, d.target) / 2 - $(this).attr('width') / 2
                    return that.getDis(d.source, d.target) / 2 - d3.select(this).attr('width') / 2
                })    // x 坐标为两点中心距离减去自身长度一半
            //更新节点坐标
            this.svg_nodes
                .attr("cx",function(d){ return d.x; })
                .attr("cy",function(d){ return d.y; });
            //更新文字坐标
            this.svg_texts
                .attr("x", function(d){ return d.x; })
                .attr("y", function(d){ return d.y; });
        }
    },
    mounted () {
        this.initMap();
        this.initRelation();

        //选择器select、selectAll 选择第一个和选择全部；可选择id、class、元素、
        d3.select("body").select(".spans").text("jshdj222hadasj").style("color","blue");
        //datum 绑定一条数据 data绑定数组 append添加元素、remove删除元素
        var str = "123123";
        var arr = ["1","2"];
        let body = d3.select("body");
        let pa = body.selectAll("p");
        let p = body.select("p");
        pa.data(arr).text((d,i) => "di" + i + "geyuansushi" + d);

        //svg绘图
        let width = "400px",
            height = "200px";
        var dataset = [ 250 , 210 , 170 , 130 , 90 ];  //数据（表示矩形的宽度）
        var rectHeight = 25;   //每个矩形所占的像素高度(包括空白)
        let svg = d3.select("#q").append("svg")
        .attr("width",width)
        .attr("height",height);
        
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x",20)
        .attr("y",function(d,i){
            return i * rectHeight;
        })
        .attr("width",function(d){
            return d;
        })
        .attr("height",rectHeight-2)
        .attr("fill","steelblue");
    },
    components: {
        created () {
            
        }
    },
}
</script>

<style scoped>
    #relation{
        width: 100%;
        height:600px;
    }
</style>