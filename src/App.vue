<template>
  <div id="app">
    <div class="navs" v-show="this.$root.loginVisible">
      <my-nav :isLogin="isLogin" :userinfo="userinfo" @logout="logout"></my-nav>
    </div>
    <div class="midden">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </div>

    <my-bottom v-show="this.$root.loginVisible"></my-bottom>
  </div>
</template>


<script>
import MyNav from '@/views/nav';
import MyBottom from '@/views/bottom';
import MyLogin from '@/views/login/index';
import { getLocalStorage, clearLocalStorage } from '@/utils/localStorage';

export default {
  data() {
    return {
      isLogin: false,
      userinfo: {},
      timesot: null
    };
  },
  created() {
    // this.browserRedirect();
  },
  methods: {
    logout(e) {
      this.isLogin = e;
    }
  },
  watch: {
    $route(newRoute, oldRoute) {
      if (newRoute.path != '/login/login' && newRoute.path != '/login/regist') {
        this.$root.loginVisible = true;
        this.isLogin = getLocalStorage('userinfo') ? true : false;
        this.userinfo = getLocalStorage('userinfo') ? getLocalStorage('userinfo') : {};
      } else {
        this.$root.loginVisible = false;
      }
    }
  },

  components: {
    MyNav,
    MyBottom,
    MyLogin
  }
};
</script>


<style lang="scss">
@import '@/assets/styles/global.scss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // text-align: justify;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .navs {
    width: 100%;
    background: $bg;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
  .midden {
    width: 100%;
    // margin: 0 auto;
    margin-top: 60px;
    // padding: 0 30px;
    min-height: 780px;
  }
}
.el-select-dropdown__item {
  font-size: 14px !important;
  padding: 0 20px !important;
  line-height: 34px !important;
  -webkit-box-sizing: border-box !important;
}
</style>
