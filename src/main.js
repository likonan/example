// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

//浏览器同源策略
//前端和后端的域名要完全一致
//域名组成：网络协议、IP、端口号 即全一致 前8080 后8088
//跨域：组成三元素不一致，就会跨域

//axios配置,全局的后台服务域名，作用：在axios发送后台服务请求时不需要添加后台域名，axios会根据baseURL添加
axios.defaults.baseURL="http://localhost:8088"
//axios请求拦截器
axios.interceptors.request.use(config =>{

  //给请求头设置请求参数的数据格式为json
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  if(sessionStorage.getItem('token')!=null){
    config.headers['Authorization']=sessionStorage.getItem('token');
  }
  return config;
},error => Promise.reject())

//定于全局axios变量
Vue.prototype.$axios = axios

Vue.config.productionTip = false
//把element-ui加入vue对象
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',//绑定div的id，一般绑定App.vue的id属性名，作用：vue对象作用到html标签的范围，如果自定义的标签在绑定范围之外，vue对象不能加载该标签
  router,//绑定router/index.js中的内容，制作页面的路由跳转，根据路由中的path路径来绑定不同的vue文件
  components: { App },//绑定的组件，默认为App.vue
  template: '<App/>'
})

//头像上传思路
//1.前端页面添加一个头像上传的组件，当上传图片后，向后台发送请求
//2.后台接收到头像上传请求后，将前端上传的图片参数保存在本地服务器目录下
//3.在后台设置静态资源映射，将本地服务器的图片映射为http协议的url路径
//4.将映射的http协议的url路经返给前端,前端将url保存到对象字段中
//5.当添加用户对话框点击确定按钮保存时,将图片的url保存到数据库中
