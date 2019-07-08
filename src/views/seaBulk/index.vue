<template>
  <div>
    <img class="full-logo" src="./../../assets/images/SHIPPING ON TIME.png" alt>
    <div class="full-content" v-loading="dataLoading">
      <my-search
        @ectentAdvancedSearch="ectentAdvancedSearch"
        :isEctents="isEctents"
        :origins="origins"
        :destinations="destinations"
        @search="search"
        :start="params.origin_id"
        :end="params.destination_id"
      ></my-search>
      <div class="condition-box" :class="{'active-box':isEctents}">
        <el-row :gutter="30">
          <el-col :span="5">
            <div class="cabinet-type">
              <el-row>
                <el-col :span="4">
                  <span class="day-aging">航期</span>
                </el-col>
                <el-col :span="18">
                  <el-input @input="changeDay" type="number" size="mini" placeholder="输入航期天数" clearable v-model="params.days"></el-input>
                </el-col>
                <el-col :span="2">
                  <span class="day-aging">天</span>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="11">
            <div class="week-type">
              <span>班期</span>
              <el-checkbox-group @change="selectWhichDay" v-model="which_day_bac">
                <el-checkbox class="radio-item" :label="item.name" v-for="(item,index) in which_day" :key="index"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
          
          <el-col style="width:auto;" v-show="carriers.length>0">
            <div class="carrier-people">
              <span>承运人</span>
              <el-checkbox-group class="fixed-item" @change="selectCarriers" v-model="carrier_id_bac">
                <el-checkbox class="radio-item" :label="item.name" v-for="(item,index) in carriers" :key="index"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-box">
        <el-table
          ref="multipleTable"
          :data="tableDataList"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="tabelLoading"
          type="index"
          :row-style="this.$root.tableContentStyle"
          :header-cell-style="this.$root.tableTitileStyle"
        >
          <el-table-column header-align="center" align="center" label="NO" width="50">
            <template slot-scope="scope">
              <div>{{(scope.$index + 1) + (params.page-1)*params.page_size}}</div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="起始地">
            <template slot-scope="scope">
              <div>{{getMappingVal(origins,'id',scope.row.origin_id,'name')}}</div>
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" label="目的地">
            <template slot-scope="scope">
              <div>{{getMappingVal(destinations,'id',scope.row.destination_id,'name')}}</div>
            </template>
          </el-table-column>

          <!-- :prop="item.name" -->
          <el-table-column v-for="(item,index) in containers" :key="index" header-align="center" align="center" :label="item.name">
            <template slot-scope="scope">
              <span class="gp-style">{{scope.row[item.name]}}</span>
            </template>
          </el-table-column>

          <el-table-column header-align="center" prop="carrier_name" align="center" label="承运人" width="100"></el-table-column>
          <el-table-column header-align="center" align="center" label="航期" width="80">
            <template slot-scope="scope">
              <div class="hq-style">{{scope.row.days_min}}-{{scope.row.days_max}}天</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination" v-show="!tabelLoading">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="params.page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="params.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import MySearch from '@/components/common/Search';
import { getFullCabinetBase, getFullCabinetList } from '@/api/seabulk';
import { formatSelectCheckout } from '@/utils/utils';
import _ from 'lodash';

export default {
  data() {
    return {
      tableDataList: [
        // {
        //     "20GP": "12",
        //     "40GP": "23",
        //     "40HQ": "36",
        //     "45HQ": "50",
        //     carrier: "MAERSK",
        //     days: 25,
        //     destination: "美国",
        //     origin: "深圳",
        //     which_day: "周一",
        // },
      ],
      tabelLoading: false,
      total: null,
      isEctents: false,
      dataLoading: false,
      origins: [], //起始地
      destinations: [], //目的地
      carriers: [], //承运人
      containers: [], //表头的 20gp  30gp  40gp ... 不确定...
      which_day: [
        { id: 1, name: '周一' },
        { id: 2, name: '周二' },
        { id: 3, name: '周三' },
        { id: 4, name: '周四' },
        { id: 5, name: '周五' },
        { id: 6, name: '周六' }
      ],
      which_day_bac: [], //班期
      carrier_id_bac: [], //承运人
      params: {
        origin_id: null, //起始地id
        destination_id: null, //目的地id
        // days_min: null, //航期最小
        // days_max: null, //航期最大
        days: '', //货运时效
        which_day: [], //班期
        carrier_id: [], //承运人id
        page: 1, //当前页
        page_size: 10 //每页显示
      }
    };
  },
  created() {},
  async mounted() {
    if (this.$route.query.start && this.$route.query.end) {
      await this.getFullCabinetBase();
      this.params.origin_id = this.$route.query.start;
      // this.params.origin_id = Number(this.$route.query.start);
      this.params.destination_id = this.$route.query.end;
      // this.params.destination_id = Number(this.$route.query.end);
      this.getFullCabinetList();
    } else {
      this.getFullCabinetBase();
      this.getFullCabinetList();
    }
  },
  methods: {
    changeDay: _.debounce(function() {
      this.getFullCabinetList();
    }, 400),
    selectWhichDay() {
      //点击班期
      this.params.which_day = formatSelectCheckout(this.which_day_bac, this.which_day);
      this.getFullCabinetList();
    },
    selectCarriers() {
      //点击承运人
      this.params.carrier_id = formatSelectCheckout(this.carrier_id_bac, this.carriers);
      this.getFullCabinetList();
    },
    search(e) {
      this.params.which_day = formatSelectCheckout(this.which_day_bac, this.which_day);
      this.params.carrier_id = formatSelectCheckout(this.carrier_id_bac, this.carriers);

      this.params.origin_id = e.origin_id;
      this.params.destination_id = e.destination_id;
      this.getFullCabinetList();
    },
    async getFullCabinetList() {
      //获取列表数据
      this.tabelLoading = true;
      try {
        let datas = await getFullCabinetList(this.params);
        this.total = datas.total;
        this.containers = datas.containers; //表头
        this.tableDataList = datas.rows;
      } catch (error) {
        this.$message.error(error.message);
      }
      this.tabelLoading = false;
    },
    async getFullCabinetBase() {
      //海运整柜基础数据  起始地  目的地  承运人
      this.dataLoading = true;
      try {
        let datas = await getFullCabinetBase();
        this.origins = datas.origins; //起始地
        this.destinations = datas.destinations; //目的地
        this.carriers = datas.carriers; //承运人
      } catch (error) {
        this.$message.error(error.message);
      }
      this.dataLoading = false;
    },
    carriersChange(e) {
      this.params.carrier_id = e;
    },
    ectentAdvancedSearch() {
      this.isEctents = !this.isEctents;
    },
    handleSizeChange(val) {
      //设置每页展示条数
      this.params.page_size = val;
      this.getFullCabinetList();
    },
    handleCurrentChange(val) {
      //跳到第几页
      this.params.page = val;
      this.getFullCabinetList();
    }
  },
  components: {
    MySearch
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.full-logo {
  border: 0;
  display: block;
  width: 100%;
}
.full-content {
  width: 1200px;
  margin: 0 auto;
  min-height: 700px;
}
.condition-box {
  height: 110px;

  overflow: hidden;
  @include transitons(0.2s);
  &.active-box {
    height: 0;
  }
  .ferry-day {
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    .ferry-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #007947;
      text-align: center;
    }
  }
}
.cabinet-type,
.week-type,
.carrier-people {
  height: 40px;
  line-height: 40px;
  border: 1px solid #f1f1f1;
  padding: 0 10px;
  font-size: 15px;
  color: #007947;
  border-radius: 5px;
  display: flex;
  width: auto;
  span {
    margin-right: 28px;
    font-size: 15px;
    float: left;
  }
  .radio-item {
    margin-right: 20px;
  }
  .fixed-item{
    flex: 1;
  }
  /deep/ .el-input__inner {
    border: none !important;
    outline: none !important;
  }
}
.carrier-people {
  margin-top: 20px;
}
.table-box {
  margin-top: 40px;
}
.pagination {
  padding: 20px 50px;
  text-align: center;
  margin-bottom: 50px;
}
.day-aging {
  margin: 0 !important;
}
.table-cont {
  color: #ff9027 !important;
}
.hq-style {
  color: #ff2727;
}
.gp-style {
  color: #ff9027;
}
</style>



