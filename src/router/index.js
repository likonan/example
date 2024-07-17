//初始化一个router数组，数组中添加路由对象，每一个对象都有一个path属性和一个component属性
//path表示路径、component表示对应的组件
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'

//@默认src目录
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',//路由路径
      name: 'Login',
      component: Login
    },
    {
      path:'/hello',
      name:'HelloWorld',
      component:HelloWorld
    }
  ]
})
