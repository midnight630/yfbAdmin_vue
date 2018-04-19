<template>
  <div id="app">
    <div class="nav-box">
      <y-sider-bar :handleShrink='handleShrink' :leftPadding='leftPadding' :isCollapse='isCollapse'></y-sider-bar>
    </div>

    <div class="container" :style="'padding-left:'+ leftPadding +'px'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SideBar from '@/components/side_bar/index'

  export default {
    name: 'app',
    data() {
      return {
        leftPadding: 260,
        isCollapse: false
      }
    },
    components: {
      'y-sider-bar': SideBar
    },
    methods: {
      handleShrink() {
        this.isCollapse = !this.isCollapse
        this.isCollapse ? this.leftPadding = 70 : this.leftPadding = 260
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }

  .nav-box{

  }
</style>
<style lang='less' rel='stylesheet/less'>
  .container{

  }
</style>
