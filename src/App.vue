<!--App.vue 项目的主页面-->
<!--template 主要写html标签-->
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<!--主要写vue代码-->
<script>
export default {
  name: 'App'
}
</script>

<!--css样式 注意：有一个scoped属性，表示style中的css样式只在当前文件生效；若无，则css样式在整个项目中全局生效-->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
