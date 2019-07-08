
<template>
  <div class="account-login">
    <!-- <div class="account-title">用户注册</div> -->
    <el-radio v-model="params.user_type" label="2">企业</el-radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-radio v-model="params.user_type" label="1">个人</el-radio>

    <br>
    <br>
    <div class="item" v-show="params.user_type=='2' || params.user_type==''">
      <div class="icon-box">
        <i class="iconfont icon-gongsi"></i>
      </div>
      <div class="ipt">
        <input type="text" v-model="params.company_name" placeholder="请输入公司名称">
      </div>
    </div>
    <div class="item">
      <div class="icon-box">
        <i class="iconfont icon-shoujihao"></i>
      </div>
      <div class="ipt">
        <input type="text" v-model="params.phone" placeholder="请输入手机号码">
      </div>
    </div>
    <div class="item">
      <div class="icon-box">
        <i class="iconfont icon-yanzhengma1"></i>
      </div>
      <div class="ipt">
        <input type="text" v-model="params.phone_verify" placeholder="请输入手机验证码">
      </div>
      <button class="phone-yzm" :class="{'yzm-active':yzmDisabel}" @click="getCaptcha" :disabled="yzmDisabel">{{yzmText}}</button>
    </div>
    <div class="item">
      <div class="icon-box">
        <i class="iconfont icon-user"></i>
      </div>
      <div class="ipt">
        <input type="text" v-model="params.username" placeholder="请输入用户名">
      </div>
    </div>

    <div class="item">
      <div class="icon-box">
        <i class="iconfont icon-mima"></i>
      </div>
      <div class="ipt">
        <input type="password" v-model="params.password" placeholder="请设置登录密码">
      </div>
    </div>
    <div class="item">
      <div class="icon-box">
        <i class="iconfont icon-mima"></i>
      </div>
      <div class="ipt">
        <input type="password" v-model="params.password2" placeholder="确定密码">
      </div>
    </div>

    <div class="item remember-item">
      <div class="fl remember">
        <el-checkbox v-model="isChecked">阅读并同意</el-checkbox>
        <span @click="seaverProtocolVisible = true">《海鸥平台服务条款》</span>
      </div>
    </div>

    <div class="login-btn">
      <el-button class="regist-btn" @click="regist" :loading="registLoading">{{registText}}</el-button>
    </div>

    <seaver-protocol @closeSeaverVisible="handleClose" :seaverProtocolVisible="seaverProtocolVisible"></seaver-protocol>
  </div>
</template>

<script>
// import { getVerificationCode } from '@/api/common';
import { getCaptcha, goRegister } from '@/api/user';
import { isPone } from '@/utils/utils';
import SeaverProtocol from '@/components/SeaverProtocol';
import { message } from '@/utils/tool';

export default {
  data() {
    return {
      yzmText: '获取手机验证码',
      yzmDisabel: false,
      params: {
        user_type: '2',
        phone: '', //手机号
        phone_verify: '', //验证码
        username: '', //用户名
        company_name: '', //公司名称
        password: '', //密码
        password2: '' //确认密码
      },
      count: 60,
      isChecked: true,
      registLoading: false,
      registText: '注册',
      seaverProtocolVisible: false
    };
  },
  methods: {
    async regist() {
      if (this.params.user_type == '') {
        this.$message.warning('请选择用户类型');
        return;
      } else if (!isPone(this.params.phone)) {
        this.$message.warning('请输入正确的手机号');
        return;
      } else if (!this.params.phone_verify.length) {
        this.$message.warning('请输入验证码');
        return;
      } else if (!this.params.username.length) {
        this.$message.warning('请输入用户名');
        return;
      } else if (!this.params.company_name.length && this.params.user_type == '2') {
        this.$message.warning('请输入公司名称');
        return;
      } else if (!this.params.password.length) {
        this.$message.warning('请输入密码');
        return;
      } else if (this.params.password != this.params.password2) {
        this.$message.warning('密码不一致,请重新填写');
        return;
      } else if (!this.isChecked) {
        this.$message.warning('请勾选《海鸥平台服务条款》');
        return;
      } else {
        this.registText = '注册中';
        this.registLoading = true;
        try {
          let { message } = await goRegister(this.params);
          this.$message.success(message);
          setTimeout(() => {
            this.$router.push({
              path: '/login/login'
            });
          }, 800);
        } catch (error) {
          message(error);
        }
        this.registText = '注册';
        this.registLoading = false;
      }
    },
    async captchas() {
      let params = {
        tel: this.params.phone
      };
      try {
        let { message } = await getCaptcha(params);
        this.$message.success(message);
      } catch (error) {
        message(error);
      }
    },
    getCaptcha() {
      if (!isPone(this.params.phone)) {
        this.$message.warning('请输入正确的手机号');
        return;
      }
      this.yzmDisabel = true;
      this.captchas();
      this.timer = setInterval(() => {
        this.count--;
        this.yzmText = `${this.count}s后重新获取`;
        if (this.count <= 0) {
          clearInterval(this.timer);
          this.count = 60;
          this.yzmText = '获取手机验证码';
          this.yzmDisabel = false;
        }
      }, 1000);
    },
    handleClose(e) {
      this.seaverProtocolVisible = e;
    }
  },
  components: {
    SeaverProtocol
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.account-login {
  width: 350px;
  margin: 0 auto;
  padding: 20px 0;
  // height: 500px;
  .account-title {
    text-align: center;
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  .item {
    width: 100%;
    margin-bottom: 20px;
    height: 50px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    .icon-box {
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      .iconfont {
        width: 20px;
        height: 20px;
        color: #007947;
      }
    }
    .ipt {
      flex: 1;
      padding-left: 10px;
      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 16px;
      }
    }
    .phone-yzm {
      width: 120px;
      background: #007947;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      font-size: 14px;
      line-height: 30px;
      outline: none;
      border: none;
      &.yzm-active {
        background: rgba(0, 121, 71, 0.5);
      }
    }
    .remember {
      display: inline-block;
      font-size: 14px;
      color: #666;
      input {
        position: relative;
        top: 2px;
      }
      span {
        color: #007947;
      }
    }
  }
  .remember-item {
    border: none;
  }
  .login-btn {
    width: 100%;
    .regist-btn {
      background: #007947;
      width: 100%;
      color: #fff;
    }
  }
}
input::-webkit-input-placeholder {
  font-size: 14px;
  color: #999;
} /* 使用webkit内核的浏览器 */
input::-moz-placeholder {
  font-size: 14px;
  color: #999;
} /* Firefox版本4-18 */
input::-moz-placeholder {
  font-size: 14px;
  color: #999;
} /* Firefox版本19+ */
input::-ms-input-placeholder {
  font-size: 14px;
  color: #999;
} /* IE浏览器 */
</style>
<style>
/* .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #007947;
  background: #007947;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #007947;
} */
</style>



