<script>
//导出vue中的对象

export default {
    data() {
      return {
        username: 'admin',
        password: '123456',
        vcode:'',
        vImgCode:''
    }
  },
  methods:{
    login(){
      // 获取用户输入的用户名和密码
      //定义一个空对象,params是一个弱类型对象，事先不定义属性，当要使用时再定义
      var params = {}
      params.username=this.username;
      params.password=this.password;
      params.vcode=this.vcode;
      console.log(params);

      //将用户名和密码发送给后台程序验证，返回结果，判断是否登陆成功
      this.$axios.post('/user/login',params)
        .then(result=>{
          console.log(result);
          var data = result.data;
          if (data.code === 200){
            //把后台传回的userId保存在页面缓存中
            sessionStorage.setItem('userId',data.data.userId);
            //存放token
            sessionStorage.setItem("token",data.data.token);

            //页面跳转
            //如果登陆成功则跳转页面，否则提示登录失败
            this.$message.success(data.msg);
            this.$router.push('/sys');
            // this.$router.replace({path:'/sys'});
          }else{
            this.$message.warning(data.msg);
          }
        })
        .catch(error=>{
          console.log(error);
        })
    },
    getVcode(){
      this.$axios.get('/user/vcode')
        .then(res=>{
          var data = res.data;
          this.vImgCode = data.data;
        })
    }
  },
  mounted() {
      this.getVcode();
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="box_card" shadow="always">
      <div>
        <h2>
          用户权限管理系统
        </h2>
      </div>
      <el-form>
        <el-form-item>
<!--v-model:输入框绑定变量，双向绑定，一般用在输入框中-->
          <el-input placeholder="用户名" prefix-icon="el-icon-user" v-model="username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" prefix-icon="el-icon-magic-stick" v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="vcode" placeholder="请输入验证码" style="width: 200px;height: 40px"></el-input>
          <img class="vcode" :src="vImgCode" @click="getVcode"/>
          <el-link :underline="false" :disabled="true">--------------------------------------看不清？点击刷新</el-link>
        </el-form-item>
        <el-form-item>
<!--          v-on:触发事件，click事件名称，login事件方法-->
          <el-button type="primary" style="width: 100%" icon="el-icon-user" v-on:click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <h1></h1>
    </el-card>
  </div>
</template>

<style scoped>
/*以小数点开头的为类选择器*/
  .box_card{
    width: 30vw;
/*    !*
    height: 400px;
    *!
    margin: 0 auto;*/
    height: 55vh;
  }

.login-container{
  display: flex;
  justify-content: center;
  align-items: center;
  /*vh浏览器高度的1%
  vw浏览器宽度的百分比
  */
  height: 100vh;
  background-image: url("../../assets/img_1.png");
}
  h2{
    text-align: center;
  }
  .vcode{
    height: 40px;
    vertical-align: bottom;
  }
</style>
