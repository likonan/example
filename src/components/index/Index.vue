<script>
  export default {
    data(){
      return{
        menuList:[],
        username:''
      }
    },
    methods:{
      getMenuByUserId(){
        //从缓存中获取userId封装
        var params = {};
        params.userId = sessionStorage.getItem('userId');

        //发送请求获取菜单列表
        //get请求的参数格式：{params:参数对象}
        this.$axios.get('/user/menu',{params:params})
          .then(result=>{
            var data = result.data;
            this.menuList=data.data;
          })
          .catch(e=>{
            console.log(e);
          })
      },
      getUserInfo(){
        var params = {};
        params.userId = sessionStorage.getItem('userId');
        this.$axios.get('/user/info',{params:params})
        .then(result=>{
          var data = result.data;
          if (data.code == 200){
            this.username = data.data.username;
          }
        })
        .catch(e=>{
          console.log(e);
        })
      },
      logout(){
        this.$confirm("确定退出系统？","提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        })
          .then(()=>{
            //清除缓存
            sessionStorage.clear();
            //跳转到登录页面
            this.$router.push('/');
          })
          .catch(e=>{
            console.log(e);
          })
      }
    },
    mounted() {
      // mounted: 表示在页面渲染完成后自动触发的事件方法
      this.getMenuByUserId();
      this.getUserInfo();
    }
  }
</script>

<template>
  <div>
    <el-container>
      <el-aside width="200px">
<!--default-active:默认激活菜单项
    background-color:背景颜色
    text-color：字体颜色
    active-text-color：被激活的菜单项的字体颜色
    router:启用vue-router模式，以index属性作为路由的path来跳转页面
    -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
<!--
          // v-bind：将变量绑定到标签属性上，简写为":"
-->
          <el-submenu :index="menu.permUrl" v-for="menu in menuList" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
<!--              {{}}:插值表达式，在文本区域插入变量-->
              <span>{{menu.permName}}</span>
            </template>
            <el-menu-item-group v-if="menu.children.length > 0">
              <el-menu-item
                :index="child.permUrl"
                v-for="child in menu.children"
                :key="child.id"
                >{{child.permName}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <span>
              用户权限管理系统
            </span>
          </div>
          <div>
            <el-menu default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#e6e6e6">
              <el-submenu index="1">
                <template slot="title">{{username}}</template>
                <el-menu-item index="1-1" @click="logout">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header{
  background-color: #e6e6e6;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-container {
  height: 100vh;
}
.el-menu{
  border-right: 0px;
}

</style>
