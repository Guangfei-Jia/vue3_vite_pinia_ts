<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>聊天信息（使用两个浏览器登陆不同账户可以进行测试）</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >加入聊天</el-button
            >
          </div>
          <div style="height: 500px; overflow: scroll">
            <div v-for="o in messageList" :key="o.id">
              <div
                v-if="o.data.name"
                class="text item"
                :style="{
                  'text-align':
                    o.data.name === (userInfo as any).username ? 'right' : 'left',
                }"
     d          >
                {{ o.data.name }}:
                {{ o.data.message }}
              </div>
              <div v-else class="text item">
                {{ o.data }}
              </div>
            </div>
          </div>

          <el-form :model="message" style="margin-top: 20px">
            <el-col :span="20">
              <el-form-item>
                <el-input v-model="message.msg" placeholder="信息"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">发送</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>当前用户</span>
          </div>
          <div v-for="o in userlist" :key="o.id" class="text item">
            {{ o.name }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
 
<script setup lang="ts">
  import { ref, reactive, onMounted} from 'vue'; 
  import { useStore } from '../store'

  interface list{
    id:number,
    name:string,
    data:{
      name:string,
      message:string
    }
  }
  const path = "ws://localhost:8090";
  let webSocket = reactive<any>({});
  let message = reactive({msg:""});
  let userlist = ref<Array<list>>();
  let messageList = ref<Array<list>>([]);

  const userInfo = useStore().userInfo;

  const initWebSocket = () => {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        webSocket = new WebSocket(path);
        webSocket.onopen = openWS;
        webSocket.onerror = errorWS;
        webSocket.onmessage = messageWS;
        webSocket.onclose = closeWS;
      }
  };
  const openWS = () => {
      console.log("连接成功");
      let data = {
        type: "join",
        name: (userInfo as any).username,
      };
      sendWS(data);
    };
    const errorWS = () => {
      console.log("连接错误");
      initWebSocket(); //短线重新连接
    };
    const sendWS = (data:any) => {
      console.log("发送数据");
      webSocket.send(JSON.stringify(data));
    };
    const messageWS = (e:any) => {
      console.log("接收数据");
      let data = e.data;
      let JSONdata = JSON.parse(data);
      switch (JSONdata.type) {
        case "join":
          messageList.value.push(JSONdata);
          break;
        case "userList":
          userlist = JSON.parse(JSONdata.userList);
          break;
        case "message":
          messageList.value.push(JSONdata);
          break;
        default:
          break;
      }
      console.log(JSON.parse(e.data));
    };
    const closeWS = () => {
      console.log("关闭连接");
    };
    const onSubmit = () => {
      //用户信息需要后端token去解析，不能前端携带
      //提交信息
      let data = {
        type: "message",
        name: (userInfo as any).username,
        message: message.msg,
      };
      sendWS(data);
    };
  onMounted(initWebSocket);
  </script>