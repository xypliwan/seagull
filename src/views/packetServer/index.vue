<template>
  <div>
    <img class="full-logo" src="./../../assets/images/SHIPPING ON TIME.png" alt>

    <div class="full-content">
      <my-search
        @ectentAdvancedSearch="ectentAdvancedSearch"
        :isEctents="isEctents"
        :origins="origins"
        :destinations="destinations"
        @search="search"
        :start="params.origin_id_arr"
        :end="params.destination_code"
        @handleChanges="handleChanges"
      ></my-search>

      <div class="condition-box" :class="{'active-box':isEctents}">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="week-type">
              <span>班期</span>
              <el-checkbox-group @change="selectWhichDay" v-model="which_day_bac">
                <el-checkbox class="radio-item" :label="item.name" v-for="(item,index) in which_day" :key="index"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="cabinet-type">
              <el-row>
                <el-col :span="4">
                  <span class="day-aging">时效</span>
                </el-col>
                <el-col :span="18">
                  <el-input @input="changeDay" size="mini" type="number" placeholder="输入时效天数" clearable v-model="params.days"></el-input>
                </el-col>
                <el-col :span="2">
                  <span class="day-aging">天</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top:10px;" v-show="vol_rates.length>0">
          <el-col style="width:auto;">
            <div class="cabinet-type tiji-box">
              <span>体积系数</span>
              <el-checkbox-group @change="selectVolRates" v-model="params.vol_rates">
                <el-checkbox class="radio-item" :label="item" v-for="(item,index) in vol_rates" :key="index"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <p class="tip" v-show="tableList.length">
        该运费仅供参考，以实际业务数据为计费标准
        <span class="fr">共搜索出 {{tableList.length}} 条结果</span>
      </p>
      <div class="list-wrapper">
        <el-row v-loading="tableLoading" style="margin-top:10px;min-width:400px">
          <div class="item-wrapper" v-for="(item,i) in tableList" :key="i">
            <div class="item-top">
              <div class="left-top fl">
                <i class="iconfont icon-baoguo"></i>
                <span>{{item.name}}</span>
              </div>
              <div class="right-top fr">
                <span v-show="item.delivery_time.length">预计 {{item.delivery_time}} 自然日</span>
                <span v-show="item.punctuality_rate.length">准点率 {{item.punctuality_rate}}%</span>
              </div>
            </div>

            <div class="item-cont">
              <div class="note">{{item.note}}</div>
              <div class="table-title">
                <div class="title-every">重量段</div>
                <div class="title-every" v-for="(every,j) in item.zonePrices" :key="j">{{every.zone_name}}</div>
              </div>
              <div class="table-cont">
                <div class="cont-every">
                  <div class="text" v-for="(one,l) in item.weightArr" :key="one.ref_wl_title">{{one.ref_wl_title}}</div>
                </div>

                <div class="cont-every" v-for="(every,j) in item.zonePrices" :key="j">
                  <div class="title-every" v-for="(one,l) in every.prices" :key="l">
                    <div class="fv-value">
                      {{item.currency_list.currency_symbol_left}}
                      <span>{{one.ref_fv_value}}</span>
                      {{one.value_unit}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="table-cont" v-show="item.isMore">
                <div class="cont-every">
                  <div class="text" v-for="one in item.outher_weightArr" :key="one.ref_wl_title">{{one.ref_wl_title}}</div>
                </div>

                <div class="cont-every" v-for="(every,j) in item.zonePrices" :key="j">
                  <div class="title-every" v-for="(one,l) in every.outher_price" :key="l">
                    <div class="fv-value">
                      {{item.currency_list.currency_symbol_left}}
                      <span>{{one.ref_fv_value}}</span>
                      {{one.value_unit}}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mores" v-show="item.hasMore">
                <span @click="extendMore(i)">
                  <i class="iconfont icon-shurukuangshensuoshouqi" :class="{' extent-icon':item.isMore}"></i>
                  {{item.moreTxt}}
                </span>
              </div>
            </div>
          </div>
        </el-row>
      </div>

      <div class="no-data" v-show="!tableList.length && !tableLoading">暂无数据</div>
    </div>
  </div>
</template>
<script>
import MySearch from '@/components/common/Search';
import { getSeabulkBaseData, getSeabulkList,getBaseDestination } from '@/api/seabulk';
import { formatSelectCheckout } from '@/utils/utils';
import _ from 'lodash';
export default {
  data() {
    return {
      interval: null,

      tableList: [],
      tableLoading: false,
      isEctents: false,
      origins: [], //起始地
      destinations: [], //目的地
      params: {
        group: 'P',
        origin_id_arr: '', //起始id
        destination_code: '', //目的国家代码
        days: '',
        which_day: '', //班期
        vol_rates: [] //体积系数
      },
      which_day_bac: [],
      which_day: [
        { id: '1', name: '周一' },
        { id: '2', name: '周二' },
        { id: '3', name: '周三' },
        { id: '4', name: '周四' },
        { id: '5', name: '周五' },
        { id: '6', name: '周六' },
        { id: '7', name: '周日' }
      ],
      vol_rates: [] //体积系数
    };
  },
  created() {},
  async mounted() {
    if (this.$route.query.start && this.$route.query.end) {
      await this.getSeabulkBaseData();
      // this.params.origin_id = Number(this.$route.query.start);
      this.params.origin_id_arr = this.$route.query.start;
      this.params.destination_code = this.$route.query.end;
      this.getSeabulkList();
    } else {
      this.getSeabulkBaseData();
      this.getSeabulkList();
    }
  },
  methods: {
    async handleChanges(e) {
      try {
        let datas = await getBaseDestination({ origin_id: e, group: 'P' });
        datas.forEach((el, index) => {
          (el.id = el.code), (el.name = `${el.code} ${el.name}`);
        });
        this.destinations = datas;
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    extendMore(i) {
      this.tableList[i].isMore = !this.tableList[i].isMore;
      this.tableList[i].moreTxt = this.tableList[i].isMore ? '收起' : '查看更多';
    },
    changeDay: _.debounce(function() {
      this.getSeabulkList();
    }, 400),
    selectWhichDay() {
      //班期
      this.params.which_day = formatSelectCheckout(this.which_day_bac, this.which_day);
      this.getSeabulkList();
    },
    selectVolRates() {
      this.getSeabulkList();
    },
    search(e) {
      this.params.which_day = formatSelectCheckout(this.which_day_bac, this.which_day);
      this.params.origin_id_arr = e.origin_id;
      this.params.destination_code = e.destination_id;

      this.getSeabulkList();
    },
    ectentAdvancedSearch(e) {
      this.isEctents = e;
    },
    async getSeabulkList() {
      this.tableList = [];
      this.tableLoading = true;
      try {
        let datas = await getSeabulkList(this.params);
        datas.rows.forEach((el, i) => {
          el.weightArr = [];
          el.outher_weightArr = [];
          el.hasMore = false;
          el.zonePrices.forEach((ev, j) => {
            ev.outher_price = [];
            el.isMore = false;
            el.moreTxt = '查看更多';
            if (j == 0) {
              if (ev.prices.length > 10) {
                el.weightArr = ev.prices.slice(0, 10);
                el.outher_weightArr = ev.prices.slice(10, ev.prices.length);
                el.hasMore = true;
              } else {
                el.weightArr = ev.prices;
                el.outher_weightArr = [];
                el.hasMore = false;
              }
            }
            if (ev.prices.length > 10) {
              ev.outher_price = ev.prices.slice(10, ev.prices.length);
              ev.prices = ev.prices.slice(0, 10);
            }
          });
        });
        this.tableList = datas.rows;
      } catch (error) {
        this.$message.error(error.message);
      }
      this.tableLoading = false;
    },
    async getSeabulkBaseData() {
      this.dataLoading = true;
      try {
        let datas = await getSeabulkBaseData({ group: 'P' });
        // this.origins = datas.origins;
        this.$nextTick(() => {
          this.vol_rates = datas.vol_rates;
          datas.origins.forEach((el, index) => {
            let item = {
              id: Number(el.id),
              name: el.name
            };
            this.origins.push(item);
          });
          datas.destinations.forEach((el, index) => {
            let item = {
              id: el.code,
              name: `${el.code} ${el.name}`
            };
            this.destinations.push(item);
          });
        });
      } catch (error) {
        this.$message.error(error.message);
      }
      this.dataLoading = false;
    },
    ectentAdvancedSearch() {
      this.isEctents = !this.isEctents;
    }
  },
  components: {
    MySearch
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.list-wrapper {
  margin-bottom: 50px;
  /deep/ .el-loading-spinner {
    top: 0;
  }
  .item-wrapper {
    border: 1px solid rgba(222, 228, 234, 1);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 30px;
    .item-top {
      height: 54px;
      background: rgba(249, 252, 251, 1);
      line-height: 54px;
      padding: 0 20px;
      border-bottom: 1px solid rgba(222, 228, 234, 1);
      .left-top {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        i {
          font-size: 23px;
          color: #999;
          margin-right: 15px;
          position: relative;
          top: 2px;
        }
      }
      .right-top {
        font-size: 14px;
        color: #007947;
        span {
          margin-left: 20px;
        }
      }
    }
    .item-cont {
      padding: 15px 20px;
      .table-title {
        height: 40px;
        line-height: 40px;
        display: flex;
        font-size: 14px;
        color: #333;
        background: rgba(249, 252, 251, 1);
        .title-every {
          flex: 1;
          text-align: center;
        }
      }
      .table-cont {
        // height: 40px;
        // line-height: 40px;
        display: flex;
        font-size: 14px;
        .cont-every {
          flex: 1;
          text-align: center;
          .text {
            font-size: 14px;
            color: #666;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #f5f5f5;
          }
          .fv-value {
            color: #ff5722;
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #f5f5f5;
            span {
              font-size: 16px;
              font-weight: 600;
            }
          }
        }
      }
      .mores {
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 13px;
        color: #007947;
        span {
          cursor: pointer;
          i {
            margin-right: 10px;
            font-size: 12px;
            position: relative;
            top: -1px;
            &.extent-icon {
              display: inline-block;
              transform: rotate(-180deg);
            }
          }
        }
      }
    }
  }
}
.note {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}

.full-content {
  width: 1200px;
  margin: 0 auto;
  // min-height: 700px;
}
.full-logo {
  border: 0;
  display: block;
  width: 100%;
}

.cabinet-type,
.week-type {
  height: 40px;
  line-height: 40px;
  border: 1px solid #f1f1f1;
  padding: 0 10px;
  font-size: 15px;
  color: #007947;
  border-radius: 5px;
  display: flex;
  span {
    margin-right: 28px;
    font-size: 15px;
    float: left;
  }
  .radio-item {
    margin-right: 20px;
  }
  /deep/ .el-input__inner {
    border: none;
  }
}

.day-aging {
  margin: 0 !important;
}

.pagination {
  padding: 20px 50px;
  text-align: center;
}
.condition-box {
  height: 100px;
  overflow: hidden;
  @include transitons(0.2s);
  &.active-box {
    height: 0;
  }
}

.no-data {
  height: 50px;
  background: #f1f1f1;
  font-size: 15px;
  text-align: center;
  line-height: 50px;
  color: #666;
  margin-top: 100px;
}
.money {
  color: #ff9027 !important;
}
.tip {
  color: #999;
  font-size: 12px;
  margin-top: 20px;
}
</style>


