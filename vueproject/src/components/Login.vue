<template>
  <div class="container">
    <div id="login">
      <div class="l_title">舆情监控系统后台管理-IT营</div>
      <dl>
        <dd><span>用户名：</span><input class="text" type="text"  v-model="loginData.username" /></dd>
        <dd><span>密码：</span><input class="text" type="password" v-model="loginData.password" /></dd>
        <dd>
          <span>验证码：</span><input id="verify" type="text" v-model="loginData.verify" />
          <i v-html="svgImg" @click="getCaptcha" class="svgImg"></i>
        </dd>
        <dd><input type="button" @click="doLogin" class="submit" name="dosubmit" value="" /></dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { message } from 'ant-design-vue';
export default defineComponent({
  name: "Login",
  data() {
    return {     
      svgImg: "",
      loginData: {
        username: "",
        password: "",
        verify: "",
        svgKey: "",
      },
    };
  },
  methods: {
    getCaptcha() {
      let api = "http://yuqing.itying.com/api/captcha";
      this.$axios.get(api).then((response: any) => {
        console.log(response);
        this.svgImg = response.data.svgImg;
        this.loginData.svgKey = response.data.svgKey;
      });
    },
    doLogin() {
      let api = "http://yuqing.itying.com/api/doLogin";
      this.$axios.post(api, this.loginData).then((response: any) => {
        console.log(response)
        if(response.data.success==true){    
          //保存用户信息
           this.$storage.set("userinfo",response.data.result)   
           this.$router.push({
              path: '/'
            });
        }else{
          message.error(response.data.message)
        }

      });
    },
  },
  mounted() {
    this.getCaptcha();
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #01458e !important;
}
#login {
  width: 740px;
  height: 300px;
  background: url(../assets/loginbg.jpg) no-repeat left center;
  /*background:#EDEFFC;*/
  margin: 120px auto 0 auto;
}
#login dl {
  width: 500px;
  margin: 0 0 0 auto;
  padding: 10px 0 0 20px;
  color: #01458e;
  float: left;
  font-size: 15px;
}
#login dl dd {
  margin: 16px 0;
  height: 32px;
  line-height: 32px;
}
#login dl dd span {
  display: inline-block;
  width: 80px;
  text-align: right;
}
#login dl dd input.text {
  width: 280px;
  height: 30px;
  line-height: 30px;
}
#login dl dd input.submit {
  background: url("../assets/login_btn.jpg") no-repeat center center;
  border: none;
  margin: 10px;
  margin-left: 78px;
  padding: 2px 8px 0;
  cursor: pointer;
  width: 123px;
  height: 29px;
}
#login dl dd.code {
  padding: 0 0 0 72px;
}
#login dl dd.code img {
  border: 1px solid #eee;
  cursor: pointer;
}
#verify {
  height: 30px;
  line-height: 30px;
  width: 90px;
  margin-right: 3px;
}
.svgImg {
  cursor: pointer;
  position: relative;
  top: -15px;
  left: -150px;
  float: right;
}
.text {
  height: 22px;
}
.l_title {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  padding-left: 5px;
  padding-top: 10px;
  color: #01458e;
  font-weight: bold;
}
</style>
