<template>
  <div>
    <div class="box-img">
      <img class="full-logo" src="./../../assets/images/cost.png" alt>
    </div>
    <div class="full-content">
      <div class="cost-title">
        <p class="title">为跨境电商卖家提供空运、海运、国际快递等服务的线上综合服务平台</p>
        <span>222</span>
      </div>
      <search-condit @search="search" @reset="reset" :countryList="countryList" :packageList="packageList"></search-condit>
      <p class="tip" v-show="costList.length">共搜索出{{costList.length}}条结果</p>
      <el-row style="margin-top:40px;min-width:400px" v-loading="dataLoading">
        <div class="cost-item" v-for="(item,index) in costList" :key="index">
          <div class="item-top">
            <span class="top-title">{{item.ServiceCode}}</span>
            <span class="top-title names">渠道名称:{{item.ServiceCnName}}</span>
            <el-button size="mini" type="primary" class="fr btns xd" @click="goDemand(item.ServiceCode,'1')">立即下单</el-button>
            <el-button type="primary" size="mini" class="fr btns" @click="goDemand(item.ServiceCode,'2')">发布需求</el-button>
          </div>
          <div class="country-list">
            <span class="country-list-tip">派送范围:</span>
            <span v-show="!item.isMore">
              <span v-for="(every,j) in item.country_list" :key="j" v-show="j<=19">{{every.country_name}} &nbsp;&nbsp;</span>
              <span class="mores" @click="seeMore(index)">更多</span>
            </span>
            <span v-for="(every,j) in item.country_list" :key="j" v-show="item.isMore">{{every.country_name}} &nbsp;&nbsp;</span>
            <span v-show="!item.country_list.length" style="color:#999;">暂无</span>
          </div>

          <div class="item-cont">
            <div class="left cont-inner">
              <div class="tip-title">费用</div>
              <div class="cont">
                <ul class="detail-item">
                  <li class="detail-cont">计费重量: {{item.ChargeWeight}} {{item.ChargeWeightUnit}}</li>
                  <li class="detail-cont">体积系数: {{item.VolumeCharge}}</li>
                </ul>
                <ul class="detail-item">
                  <li class="detail-cont">运费: {{item.FreightFee}}</li>
                  <li class="detail-cont">燃油费: {{item.FuelFee}}</li>
                  <li class="detail-cont">挂号费: {{item.RegisteredFee}}</li>
                  <li class="detail-cont">其他费用: {{item.OtherFee}}</li>
                </ul>
              </div>
            </div>
            <div class="right cont-inner">
              <div class="tip-title">其它</div>
              <div class="cont">
                <ul>
                  <li>
                    预估时效:
                    <span class="day">{{item.Effectiveness}}</span>天
                  </li>
                  <li>是否可追踪: {{item.Traceability == 'Y' ? '是' : '否'}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="count">
            总费用:
            <span>￥ {{item.TotalFee}} {{item.FreightFeeCode}}</span>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import SearchCondit from './SearchCondit';
import { getCountryList, getCargoType, getCostTrialList } from '@/api/cost';
import { getLocalStorage, clearLocalStorage } from '@/utils/localStorage';
import { goBackJump } from '@/api/user';
import { message } from '@/utils/tool';
import baseURL from '@/config/backUrl';
export default {
  data() {
    return {
      countryList: [], //国家列表
      packageList: [], //包裹列表
      params: {
        country_code: '', //目的国家
        weight: '', //货物重量
        length: '', //货物长度
        width: '', //货物宽度
        height: '', //货物高度
        zip_code: '', //邮编
        package_type: '', //包裹类型
        page: 1,
        pageSize: 100
      },
      dataLoading: false,
      costList: []
      // isMore:false
    };
  },
  created() {
    this.getCountryList();
    this.getCargoType();
  },
  computed: {},
  methods: {
    seeMore(index) {
      this.$delete(this.costList[index], 'isMore');
      this.$set(this.costList[index], 'isMore', true);
    },
    async goDemand(code, number) {
      let userinfo = getLocalStorage('userinfo');
      if (!userinfo) {
        this.$message.warning('请先登录！');
        return;
      } else {
        try {
          let { data } = await goBackJump({ time_stamp: Date.parse(new Date()) });
          let res = {
            key: encodeURIComponent(data.key),
            token: data.token,
            time_stamp: Date.parse(new Date())
          };
          let goUrl = '';
          if (number == '1') {
            //立即下单
            goUrl = `${baseURL}?token=${res.token}&code=${code}&paths=waybill&key=${res.key}&time_stamp=${res.time_stamp}`;
          } else if (number == '2') {
            //发布需求
            goUrl = `${baseURL}?token=${res.token}&code=${code}&paths=demand&key=${res.key}&time_stamp=${res.time_stamp}`;
          }
          window.open(goUrl, '_blank');
        } catch (error) {
          message(error);
        }
      }
    },
    async getCostTrialList() {
      this.dataLoading = true;
      this.costList = [];
      try {
        let data = await getCostTrialList(this.params);
        this.costList = data;
        this.costList.forEach((el, index) => {
          el['isMore'] = el.country_list.length >= 19 ? false : true;
        });
      } catch (error) {
        this.$message.error(error.message);
        // message(error);
      }
      this.dataLoading = false;
    },
    reset(params) {
      Object.assign(this.params, params);
      this.costList = [];
    },
    search(params) {
      Object.assign(this.params, params);
      this.getCostTrialList();
    },
    async getCargoType() {
      try {
        let data = await getCargoType();
        this.packageList = data;
      } catch (error) {
        message(error);
      }
    },
    async getCountryList() {
      try {
        let data = await getCountryList();
        this.countryList = data;
      } catch (error) {
        message(error);
      }
    }
  },
  components: {
    SearchCondit
  }
};
</script>

<style lang="scss" scoped>
.box-img {
  width: 100%;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: -1;

  .full-logo {
    border: 0;
    display: block;
    width: 100%;
  }
}

.full-content {
  width: 1200px;
  margin: 0 auto;
  min-height: 700px;
  .cost-title {
    width: 100%;
    text-align: center;
    p {
      font-size: 25px;
      color: #fff;
      text-align: center;
      padding-top: 100px;
      font-weight: 400;
    }
    span {
      background: #fff;
      font-size: 10px;
      color: #fff;
      display: inline-block;
      height: 3px;
      overflow: hidden;
      width: 55px;
      margin-top: 20px;
    }
  }
}

.cost-item {
  background: #ffffff;
  border: 1px solid rgba(222, 228, 234, 1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
  .item-top {
    height: 60px;
    background: rgba(249, 252, 251, 1);
    line-height: 60px;
    padding: 0 20px;
    border-bottom: 1px solid #dee4ea;
    .top-title {
      font-size: 18px;
      color: #333333;
    }
    .names {
      margin-left: 25px;
      font-size: 15px;
    }
    .btns {
      height: 32px;
      width: 89px;
      line-height: 32px;
      text-align: center;
      padding: 0;
      margin-top: 14px;
      margin-left: 9px;
      border: none;
    }
    .xd {
      background: #ff5722;
    }
  }
  .item-cont {
    padding: 20px 20px;
    display: flex;
    .left {
      flex: 1;
      .tip-title {
        background: #ff5722;
      }
    }
    .right {
      flex: 1;
      .tip-title {
        background: #36a2a8;
      }
    }
    .cont-inner {
      position: relative;
      padding: 0 20px;
      .tip-title {
        position: absolute;
        left: 0;
        top: 0;
        width: 18px;
        padding: 7px 0;
        color: #fff;
        font-size: 12px;
        text-align: center;
      }
    }
    .cont {
      padding: 20px 20px;
      background: #f9fcfb;
      overflow: hidden;
      .detail-cont {
        color: #666666;
        font-size: 14px;
        margin-bottom: 15px;
      }
      ul {
        li {
          color: #666666;
          font-size: 14px;
          float: left;
          width: 33.3333%;
          margin-bottom: 15px;
          .day {
            color: #ff5722;
          }
        }
      }
    }
  }
}
.count {
  padding: 0 40px;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
  font-weight: 600;
  span {
    color: #ff5722;
  }
}
.tip {
  margin-top: 30px;
  text-align: right;
  color: #999;
  font-size: 12px;
}
.detail-item {
  overflow: hidden;
}
.country-list {
  margin-top: 20px;
  padding: 0 20px;
  font-size: 14px;
  color: #333;
  line-height: 25px;
}
.country-list-tip {
  color: #007947;
}
.mores {
  background: #f0f1f0;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 12px;
  color: #666;
}
</style>
