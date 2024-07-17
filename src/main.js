// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',//绑定div的id，一般绑定App.vue的id属性名，作用：vue对象作用到html标签的范围，如果自定义的标签在绑定范围之外，vue对象不能加载该标签
  router,//绑定router/index.js中的内容，制作页面的路由跳转，根据路由中的path路径来绑定不同的vue文件
  components: { App },//绑定的组件，默认为App.vue
  template: '<App/>'
})
