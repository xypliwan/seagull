<template>
  <div class="baner">
    <div class="search-box">
      <div class="search-item">
        <div class="select-transport fl">
          <el-select v-model="pageAims" clearable @change="changeType" filterable placeholder="请选择类型">
            <el-option v-for="item in areaPage" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="start fl">
          <div class="icon-img">
            <span>起</span>
          </div>
          <el-select @focus="startClick" clearable v-model="starting" filterable placeholder="请选择">
            <el-option v-for="item in startingPlace" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="start fl">
          <div class="icon-img">
            <span class="mu">目</span>
          </div>
          <el-select v-model="destination" clearable @focus="startClick" filterable placeholder="请选择">
            <el-option v-for="item in destinationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="search-btn fr">
          <el-button type="primary" size="small" icon="el-icon-search" @click="goSearch">搜索</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFullCabinetBase, getSeabulkBaseData } from '@/api/seabulk';

export default {
  data() {
    return {
      areaPage: [
        // { label: '海运整柜', value: '/sea-bulk' },
        { label: '海运散柜', value: '/sea-full' },
        { label: '空运服务', value: '/air-transport' },
        {label:"小包服务",value:'/packet-server'},
      ],
      pageAims: '',
      startingPlace: [],
      starting: '',
      destinationList: [],
      destination: '',
      startingPlaceBacOne: [], //海运整柜数据
      destinationListBacOneOne: [], //海运整柜数据
      startingPlaceBacTwo: [], //海运散柜数据
      destinationListBacOneTwo: [] //海运散柜数据
    };
  },
  created() {
    this.getFullCabinetBase();
    this.getSeabulkBaseData();
  },
  methods: {
    startClick() {
      if (this.pageAims.length <= 0) {
        this.$message.warning('请先选择搜索类型');
        return;
      }
    },
    changeType(e) {
      switch (e) {
        case '/sea-bulk':
          this.startingPlace = this.startingPlaceBacOne;
          this.destinationList = this.destinationListBacOneOne;
          break;
        case '/sea-full':
          this.startingPlace = this.startingPlaceBacTwo;
          this.destinationList = this.destinationListBacOneTwo;
          break;
        case '/air-transport':
          this.startingPlace = this.startingPlaceBacTwo;
          this.destinationList = this.destinationListBacOneTwo;
          break;
        case '/packet-server':
          this.startingPlace = this.startingPlaceBacTwo;
          this.destinationList = this.destinationListBacOneTwo;
          break;
      }
      this.starting = '';
      this.destination = '';
    },
    goSearch() {
      // console.log(this.starting,this.destination)

      // return
      if (this.starting == '' || this.destination == '' || this.pageAims == '') {
        this.$message.warning('请吧搜索条件填写完整');
        return;
      } else {
        this.$router.push({
          path: this.pageAims,
          query: { start: this.starting, end: this.destination }
        });
      }
    },
    async getFullCabinetBase() {
      //海运整柜基础数据  起始地  目的地  承运人
      try {
        let datas = await getFullCabinetBase();
        this.startingPlaceBacOne = datas.origins; //起始地
        this.destinationListBacOneOne = datas.destinations; //目的地
      } catch (error) {
        this.$message.error(error.message);
      }
      // this.dataLoading = false
    },
    async getSeabulkBaseData() {
      try {
        let datas = await getSeabulkBaseData();
        // this.startingPlaceBacTwo = datas.origins
        datas.origins.forEach((el, index) => {
          let item = {
            id: Number(el.id),
            name: el.name
          };
          this.startingPlaceBacTwo.push(item);
        });
        datas.destinations.forEach((el, index) => {
          let item = {
            id: el.code,
            name: `${el.code} ${el.name}`
          };
          this.destinationListBacOneTwo.push(item);
        });
      } catch (error) {
        this.$message.error(error.message);
      }
    }
  }
};
</script>



<style scoped lang="scss">
@import '@/assets/styles/global.scss';
.baner {
  width: 100%;
  height: 400px;
  padding: 80px 0;
  background: #ccc;
  background: url('./../../assets/images/banner01.png') no-repeat center center;
  .search-box {
    width: 800px;
    margin: 0 auto;
    height: 240px;
    text-align: center;
    overflow: hidden;
    position: relative;
    .search-item {
      width: 100%;
      height: 40px;
      background: #fff;
      overflow: hidden;
      position: absolute;
      bottom: 10px;
      left: 0;
      border-radius: 5px;
      .select-transport {
        width: 130px;
        overflow: hidden;
      }
      .start {
        width: 224px;
        overflow: hidden;
        display: flex;
        .icon-img {
          float: left;
          width: 50px;
          line-height: 57px;
          text-align: center;
          span {
            font-size: 12px;
            background: #ff9027;
            color: #fff;
            padding: 3px 3px;
            position: relative;
            top: -10px;
            border-radius: 3px;
          }
          .mu {
            background: #4290f2;
          }
        }
      }
      .end {
        width: 224px;
        overflow: hidden;
      }
      .search-btn {
        width: 85px;
        /deep/ .el-button {
          margin-top: 4px;
        }
      }
    }
    /deep/ .el-input__inner {
      border: none;
      outline: none;
      border-bottom: 1px solid #f1f1f1;
    }
  }
}
</style>


