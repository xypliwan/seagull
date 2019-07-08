
<template>
  <div class="logistics">
    <title-tip titles="海鸥派物流产品"></title-tip>
    <div class="logistics-box">
      <div class="left fl">
        <div class="item" v-for="(item,index) in logisticsInfo" :key="index" :class="{'active':currentIndex == index}" @click="currentIndex = index">
          {{item.sc_name}}
          <span class="line" :class="{'active':currentIndex == index}"></span>
        </div>
      </div>
      <div class="right fr">
        <div v-for="(every,index) in logisticsInfo" :key="index" v-show="currentIndex == index">
          <div class="top">
            <span class="code">{{every.sc_name}}</span>
            <span class="outher">{{every.sc_code}}</span>
          </div>
          <p class="tip">该数据统计时间: {{every.sca_statistics_time}}</p>

          <div class="stand-by">
            <ul>
              <li>
                <span class="origin"></span>支持上门揽收地:
                <span v-for="(origin,i) in every.origin_list" :key="i">{{origin.origin_name}} &nbsp;</span>
              </li>
              <li>
                <span class="origin"></span>支持目的地:
                <span v-for="(country,j) in every.country_list" :key="j">{{country.country_name}} &nbsp;</span>
              </li>
            </ul>
          </div>
          <div class="data-box">
            <div class="left item fl">
              <ul>
                <li>
                  平均时效
                  <span>{{every.sca_avg_aging}}</span> 天
                </li>
                <li>
                  平均响应
                  <span>{{every.avg_response_time}}</span> 分钟(线下咨询)
                </li>
                <li>
                  平均准点率
                  <span>{{every.sca_avg_punctuality_rate}}%</span>
                </li>
                <li>
                  上线日期
                  <span>{{every.sca_online_date}}</span>
                </li>
                <li style="width:100%;">
                  描述
                  <span>{{every.sca_note}}</span>
                </li>
              </ul>
            </div>
            <div class="right item fr">
              <div class="top">
                <span class="line"></span>
                当前排名
                <span class="ys">NO.{{every.sca_ranking}}</span>
              </div>
              <div class="rank">
                <ul>
                  <li v-for="(rank,rankKey) in every.ranking_list" :key="rankKey">
                    <span :class="{'one':rankKey == 0 , 'two': rankKey == 1, 'three':rankKey==2 }">{{rankKey+1}}</span>
                    {{rank.month}}月 排名 NO.{{rank.ranking}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="advisory">
            <el-button size="mini" type="primary" class="btns xd" @click="goDemand(every.sc_code,'1')">立即下单</el-button>
            <el-button type="primary" size="mini" class="btns" @click="goDemand(every.sc_code,'2')">发布需求</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTip from '@/components/common/TitleTip';
import { getHotChannel } from '@/api/seabulk';
import { getLocalStorage, clearLocalStorage } from '@/utils/localStorage';
import { goBackJump } from '@/api/user';
import { message } from '@/utils/tool';
import baseURL from '@/config/backUrl';

export default {
  data() {
    return {
      logisticsInfo: [],
      currentIndex: 0
    };
  },
  created() {
    this.getHotChannel();
  },
  methods: {
    async goDemand(code, number) {
      let userinfo = getLocalStorage('userinfo');
      if (!userinfo) {
        this.$message.warning('请先登录！');
        return;
      }
      //跳往后台
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
          goUrl = `${baseURL}?token=${res.token}&code=${code}&paths=waybill&key=${
            res.key
          }&time_stamp=${res.time_stamp}`;
        } else if (number == '2') {
          //发布需求
          goUrl = `${baseURL}?token=${res.token}&code=${code}&paths=demand&key=${res.key}&time_stamp=${
            res.time_stamp
          }`;
        }
        window.open(goUrl, '_blank');
      } catch (error) {
        message(error);
      }
    },
    async toHaiOuPai() {},
    async getHotChannel() {
      try {
        let datas = await getHotChannel();
        this.logisticsInfo = datas;
      } catch (error) {
        this.$message.error(error);
      }
    }
  },
  components: {
    TitleTip
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.logistics {
  width: 100%;
  // padding: 30px 0;

  .logistics-box {
    width: 1200px;
    margin-top: 20px;
    margin: 0 auto;
    background: #f6f8fa;
    margin-top: 20px;

    padding: 20px;
    overflow: hidden;
    .left {
      width: 250px;
      height: 100%;
      .item {
        color: #666;
        font-size: 15px;
        height: 50px;
        line-height: 50px;
        position: relative;
        border-right: 1px solid rgba(222, 228, 234, 1);
        cursor: pointer;
        &.active {
          color: #333;
          font-size: 17px;
          font-weight: 500;
        }
        .line {
          position: absolute;
          right: 0;
          top: 0;
          width: 3px;
          height: 50px;
          background: #3c9973;
          display: none;
          &.active {
            display: block;
          }
        }
      }
    }
    .right {
      width: 870px;
      height: 100%;
      .top {
        .code {
          color: #333;
          font-size: 22px;
        }
        .outher {
          color: #666666;
          font-size: 16px;
          margin-left: 25px;
        }
      }
      .tip {
        color: #999999;
        font-size: 14px;
        padding: 20px 0;
        border-bottom: 1px solid #dee4ea;
      }
      .stand-by {
        padding: 20px 0;
        overflow: hidden;
        ul {
          li {
            float: left;
            display: inline-block;
            color: #666;
            font-size: 14px;
            // margin-right: 30px;
            padding-left: 30px;
            position: relative;
            width: 50%;
            line-height: 24px;
            span.origin {
              position: absolute;
              left: 15px;
              top: 8px;
              padding: 3px;
              border-radius: 50%;
              background: #2b9da3;
            }
          }
        }
      }
      .data-box {
        overflow: hidden;
        .item {
          width: 49%;
          border: 1px solid #dee4ea;
          border-radius: 3px;
          padding: 20px 20px;
        }
        .left {
          ul li {
            float: left;
            width: 49%;
            font-size: 14px;
            color: #333;
            line-height: 28px;
            span {
              color: #ff5722;
            }
          }
        }
        .right {
          .top {
            color: #666;
            font-size: 16px;
            padding-left: 15px;
            position: relative;
            height: 17px;
            .line {
              position: absolute;
              top: 0;
              left: 0;
              display: inline-block;
              height: 15px;
              width: 3px;
              background: #2b9da3;
            }
            .ys {
              color: #ff5722;
              font-weight: 600;
            }
          }
          .rank {
            overflow: hidden;
            // margin-top: 20px;
            ul li {
              float: left;
              width: 49%;
              padding-left: 28px;
              position: relative;
              height: 20px;
              line-height: 20px;
              color: #666666;
              font-size: 14px;
              margin-top: 14px;
              span {
                position: absolute;
                top: 1px;
                left: 0;
                display: inline-block;
                height: 17px;
                width: 17px;
                background: #ccc;
                color: #fff;
                font-size: 10px;
                text-align: center;
                line-height: 18px;
                border-radius: 50%;
                &.one {
                  background: #ff5722;
                }
                &.two {
                  background: #13a468;
                }
                &.three {
                  background: #4290f2;
                }
              }
            }
          }
        }
      }
      .advisory {
        margin-top: 10px;
        .btns {
          height: 32px;
          width: 89px;
          line-height: 32px;
          text-align: center;
          padding: 0;
          margin-top: 14px;
          margin-left: 9px;
          border: none;
          margin-left: 0;
          margin-right: 15px;
        }
        .xd {
          background: #ff5722;
        }
      }
    }
  }
}
</style>
