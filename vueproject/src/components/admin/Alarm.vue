<template>
  <ul class="input_list">
    <li>
      <span>报警电话：</span>
      <a-input v-model:value="alarm.tel" placeholder="报警电话" />
    </li>

    <li>
      <span>报警邮箱：</span
      ><a-input v-model:value="alarm.email" placeholder="报警邮箱" />
    </li>
  </ul>
  <a-button type="primary" class="btn" @click="doEditAlarm">保存</a-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { message } from 'ant-design-vue';
import Storage from '../../models/storage'
import Axios from 'axios';
import {useRouter} from 'vue-router';
export default defineComponent({
  name: "Home",
  setup(){
    let router = useRouter();
    let userinfo:any;
    let alarmData:any=reactive({
      alarm: {
        tel: "",
        email: "",
      }
    })
    //初始化
    onMounted(()=>{
      userinfo = Storage.get("userinfo");

      //请求api接口数据
      getAlarmData();
    })
    //定义方法
    let getAlarmData=()=>{
      let api = "http://yuqing.itying.com/api/alarmList";
      Axios.get(api, {
          auth: {
            username: userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {
          if (response.data.success) {
            alarmData.alarm = response.data.result;
          }else if(response.data.success==false && response.data.message=="token_error"){
             message.error("token已经过期，请从新登录")
              router.push({
                path:"/login"
              })
          }else{
            message.error(response.data.message)
          }
        });
    };

    let doEditAlarm=()=>{
      let api="http://yuqing.itying.com/api/editAlarm"
      Axios.post(api,alarmData.alarm,{
          auth: {
            username: userinfo.token,
            password: "",
          },
        })
        .then((response: any) => {          
          if (response.data.success) {
            message.success("修改舆情设置成功")
          }else if(response.data.success==false && response.data.message=="token_error"){
             message.error("token已经过期，请从新登录")
             router.push({
              path:"/login"
            })
          }else{
             message.error("修改舆情设置失败");
          }
        });
    }
    return{
      ...toRefs(alarmData),
      getAlarmData,
      doEditAlarm
    }
  }
});
</script>

<style lang="scss">
.input_list {
  padding: 0px;
  li {
    margin-bottom: 10px;
    line-height: 36px;
    display: flex;
    span {
      display: inline-block;
      width: 80px;
    }
    input {
      flex: 1;
    }
  }
}
.btn {
  float: right;
  margin-right: 10px;
}
</style>
