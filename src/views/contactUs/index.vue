
<template>
  <div class="sea-server">
    <div class="img-box">
      <img src="./../../assets/images/banner03.png" alt>
    </div>
    <div class="info-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="ipt-item">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" clearable placeholder="请输入姓名"></el-input>
          </el-form-item>
        </div>
        <div class="ipt-item">
          <el-form-item label="电话号码" prop="tel">
            <el-input v-model="ruleForm.tel" clearable placeholder="请输入电话号码(国外客户填微信)"></el-input>
          </el-form-item>
        </div>
        <div class="ipt-item item-code">
          <el-form-item label="验证码" prop="verify_code">
            <el-input v-model="ruleForm.verify_code" clearable placeholder="请输入验证码"></el-input>
            <div class="code-box">
              <el-row v-loading="codeLoading">
                <img :src="codeUrl" alt @click="getCode">
              </el-row>
            </div>
          </el-form-item>
        </div>
        <div class="ipt-item">
          <el-form-item label="公司名称">
            <el-input v-model="ruleForm.company_name" clearable placeholder="请输入公司名字"></el-input>
          </el-form-item>
        </div>
        <div class="ipt-item">
          <el-form-item label="电子邮件">
            <el-input v-model="ruleForm.email" clearable placeholder="请输入电子邮件"></el-input>
          </el-form-item>
        </div>
        <div class="ipt-item">
          <el-form-item label="职务">
            <el-input v-model="ruleForm.position" clearable placeholder="请输入职务"></el-input>
          </el-form-item>
        </div>
        <div class="ipt-item">
          <el-form-item>
            <el-button :loading="reservationLoading" class="reservation-btn" type="primary" @click="submitForm('ruleForm')">{{reservationText}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getReservation, getCode } from '@/api/seabulk';
import { message } from '@/utils/tool';
import { mathRand } from '@/utils/utils';

export default {
  data() {
    return {
      ruleForm: {
        name: '',
        tel: '',
        company_name: '',
        email: '',
        position: '',
        random: '',
        verify_code: '',
        random: ''
      },
      rules: {
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        tel: [{ required: true, message: '请填写姓名手机号码(国外用户填微信)', trigger: 'blur' }],
        verify_code: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
      },
      reservationLoading: false,
      reservationText: '预约',
      codeUrl: '',
      codeLoading: false
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    async getCode() {
      this.codeLoading = true;
      this.ruleForm.random = new Date().getTime() + '_' + mathRand(6);

      try {
        let datas = await getCode({ random: this.ruleForm.random });
        this.codeUrl = datas.base64;
      } catch (error) {
        message(error);
      }
      this.codeLoading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
          if (this.ruleForm.email.length && !reg.test(this.ruleForm.email)) {
            this.$message.warning('邮箱格式有误');
            return;
          }
          this.getReservation();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    async getReservation() {
      this.reservationLoading = true;
      this.reservationText = '预约中';
      try {
        let datas = await getReservation(this.ruleForm);
        this.$message.success('预约成功！');
        this.getCode();
        this.resetForm();
      } catch (error) {
        message(error);
      }
      this.reservationLoading = false;
      this.reservationText = '预约';
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.ruleForm.company_name = '';
      this.ruleForm.email = '';
      this.ruleForm.position = '';
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.sea-server {
  width: 100%;
  .img-box {
    width: 100%;
    // height: 260px;
    // overflow: hidden;
    img {
      // height: 260px;
      display: block;
      font-size: 0;
      width: 100%;
    }
  }
  .info-box {
    width: 750px;
    margin: 100px auto;
    .ipt-item {
      margin-bottom: 30px;
      /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px solid #dcdfe6;
      }
    }
    .item-code {
      position: relative;
      /deep/ .el-input {
        width: calc(100% - 150px);
      }
      .code-box {
        position: absolute;
        top: -11px;
        right: 0;
        float: right;
        width: 150px;
        height: 50px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
  }
}
.reservation-btn {
  width: 100%;
  background: #007947;
}
</style>

