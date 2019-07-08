<template>
  <div class="nav">
    <div class="logo fl">
      <img src="./../../assets/images/logo.png" alt />
    </div>
    <div class="nav-list">
      <ul>
        <router-link to="/home" tag="li">首页</router-link>
        <!-- <router-link to="/sea-bulk" tag="li">海运整柜</router-link> -->
        <router-link to="/sea-full" tag="li">海运散柜</router-link>
        <router-link to="/air-transport" tag="li">空运服务</router-link>
        <router-link to="/packet-server" tag="li">小包服务</router-link>
        <router-link to="/cost-trial" tag="li">费用试算</router-link>
        <router-link to="/contact-us" tag="li">联系我们</router-link>
      </ul>
    </div>
    <div class="login-box fr" v-show="!hasLogin">
      <div class="login-item" @click="goLogin">登录</div>
      <div class="login-item" @click="goRegist">注册</div>
    </div>
    <div class="login-box fr" v-show="hasLogin">
      <el-dropdown @command="handleCommand" trigger="click">
        <span class="el-dropdown-link">
          {{userinfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0" @click="toHaiOuPai">后台管理</el-dropdown-item>
          <el-dropdown-item command="1" @click="loginOut">退出账号</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getLocalStorage, clearLocalStorage, setCookie, getCookie, clearCookie } from '@/utils/localStorage';
import { goBackJump, userluseLogout } from '@/api/user';
import { message } from '@/utils/tool';
import baseURL from '@/config/backUrl';

export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    userinfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      hasLogin: false
    };
  },
  mounted() {
    this.timesot = setInterval(() => {
      // console.log(getCookie('userinfo'));
      this.searchToken();
    }, 3000);
  },
  watch: {
    isLogin(newVal) {
      this.hasLogin = newVal;
    }
  },
  methods: {
    searchToken() {
      if (getCookie('userinfo') == null || !getLocalStorage('userinfo')) {
        clearLocalStorage();
        this.hasLogin = false;
        this.$emit('logout', this.hasLogin);
      }
    },
    handleCommand(command) {
      if (command == '0') {
        this.toHaiOuPai();
      } else if (command == '1') {
        this.loginOut();
      }
    },
    async toHaiOuPai() {
      //跳往后台
      try {
        let { data } = await goBackJump({ time_stamp: Date.parse(new Date()) });
        let res = {
          key: encodeURIComponent(data.key),
          token: data.token,
          time_stamp: Date.parse(new Date())
        };
        window.open(`${baseURL}?token=${res.token}&paths=home&key=${res.key}&time_stamp=${res.time_stamp}`, '_blank');
      } catch (error) {
        message(error);
      }
    },
    goLogin() {
      this.$router.push('/login/login');
    },
    goRegist() {
      this.$router.push('/login/regist');
    },
    async loginOut() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)'
      });
      try {
        let datas = await userluseLogout({ username: this.userinfo.username });
        clearLocalStorage();

        this.hasLogin = false;
        this.$message.success('账号退出成功');
        this.$emit('logout', this.hasLogin);
        clearCookie('userinfo');
      } catch (error) {
        message(error);
      }
      loading.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.nav {
  width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  .logo {
    height: 60px;
    line-height: 80px;
    text-align: left;
    .img {
      width: 123px;
      height: 32px;
    }
  }
  .nav-list {
    flex: 1;
    height: 100%;
    padding: 0 30px;
    ul {
      li {
        float: left;
        padding: 0 20px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 15px;
        color: #d2d2d2;
        cursor: pointer;
        @include transitons(0.2s);
        &:hover {
          background: rgba(6, 167, 125, 0.4);
        }
        &.router-link-active {
          background: rgba(6, 167, 125, 0.4);
          color: #fff;
        }
      }
    }
  }
  .login-box {
    width: 200px;
    height: 60px;
    color: #fff;
    .login-item {
      height: 100%;
      text-align: center;
      line-height: 60px;
      font-size: 13px;
      float: left;
      width: 50px;
      @include transitons(0.2s);
      &:hover {
        background: rgba(6, 167, 125, 0.4);
      }
      cursor: pointer;
      img {
        height: 25px;
        width: 25px;
        vertical-align: middle;
        position: relative;
        top: -2px;
        margin-right: 2px;
      }
    }
    .login-item-user {
      width: 100px;
      text-align: center;
      img {
        width: 18px;
        vertical-align: middle;
        height: 18px;
      }
    }
  }
  /deep/ .el-dropdown {
    display: block;
    width: 100px;
    height: 60px;
    line-height: 60px;
  }
  /deep/ .el-dropdown span {
    height: 60px;
    display: block;
    line-height: 60px;
    color: #fff;
    text-align: center;
  }
}
/deep/ .el-dropdown-menu__item {
  line-height: 36px !important;
  padding: 0 20px !important;
  font-size: 14px !important;
}
</style>



