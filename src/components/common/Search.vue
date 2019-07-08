<template>
  <div class="search-box">
    <div class="search-box">
      <div class="search-item">
        <div class="start fl">
          <div class="icon-img">
            <span>起</span>
          </div>
          <el-select v-model="startId" @change="handeleChange" clearable filterable :loading="isLoadingOrigins" placeholder="请选择">
            <el-option v-for="item in origins" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="start fl">
          <div class="icon-img">
            <span class="mu">目</span>
          </div>
          <el-select v-model="endId" @change="search" clearable :loading="isLoadingDestinations" filterable placeholder="请选择">
            <el-option v-for="item in destinations" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
        <div class="search-btn fl">
          <el-button type="small" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="advanced-search fr">
          <div class="advanced-text" @click="ectentAdvancedSearch">
            高级搜索
            <img src="./../../assets/images/down.png" :class="{'img-active':isEctents}">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isEctents: {
      type: Boolean,
      default: false
    },
    origins: {
      //起始地
      type: Array,
      default: []
    },
    destinations: {
      //目的地
      type: Array,
      default: []
    },
    start: {
      default: null
    },
    end: {
      default: null
    }
  },
  data() {
    return {
      // originsId:null,     //起始地
      // destinationsId:null,        //目的地
      isLoadingOrigins: true,
      isLoadingDestinations: true,
      startId: null,
      endId: null
    };
  },
  watch: {
    start(newVal) {
      // console.log(typeof newVal === "number")
      this.startId = newVal;
    },
    end(newVal) {
      this.endId = newVal;
    },
    origins(newVal) {
      this.isLoadingOrigins = false;
    },
    destinations(newVal) {
      this.isLoadingDestinations = false;
    }
  },
  methods: {
    handeleChange(e) {
      this.$emit('handleChanges', e);
      this.search();
    },
    search() {
      let params = {
        // origin_id:this.originsId,
        // destination_id:this.destinationsId
        // origin_id:this.start,
        // destination_id:this.end
        origin_id: this.startId,
        destination_id: this.endId
      };
      this.$emit('search', params);
    },
    ectentAdvancedSearch() {
      this.$emit('ectentAdvancedSearch');
    }
  }
};
</script>


<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.search-box {
  // border-bottom:1px solid #f1f1f1;
  width: 900px;
  margin: 50px auto;
  text-align: center;
  .search-item {
    width: 100%;
    height: 40px;
    background: #fff;
    overflow: hidden;
    border-radius: 5px;
    border-bottom: 1px solid #f1f1f1;
    .start {
      width: 300px;
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
    }
    .advanced-search {
      margin-left: 20px;
      text-align: right;
      font-size: 14px;
      color: #007947;
      margin-top: 15px;
      display: inline-block;
      float: right;
      img {
        transform: rotate(180deg);
        vertical-align: middle;
        width: 15px;
        height: 15px;
        transition: transform 0.3s linear;
        -moz-transition: transform 0.3s; /* Firefox 4 */
        -webkit-transition: transform 0.3s; /* Safari 和 Chrome */
        -o-transition: transform 0.3s;
        &.img-active {
          transform: rotate(0deg);
        }
      }
    }
  }
  /deep/ .el-input__inner {
    border: none !important;
    outline: none !important;
    /* border-bottom: 1px solid #f1f1f1!important; */
  }
}
</style>

<style>
.el-button--small {
  margin-top: 5px;
  background: #007947;
  color: #fff;
}
.el-button--small:hover {
  background: #007947;
  color: #fff;
}
input::-webkit-input-placeholder {
  font-size: 14px;
}
</style>


