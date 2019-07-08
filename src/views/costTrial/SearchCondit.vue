<template>
  <div class="const-search">
    <div class="title">
      费用查询
      <span class="fr">备注:本试算价格仅供参考，结算以书面为准</span>
    </div>
    <el-row style="margin:20px 0">
      <el-col :span="5">
        <el-select size="small" v-model="params.country_code" filterable clearable placeholder="目的国家">
          <el-option v-for="(item,index) in countryList" :key="index" :label="`${item.country_code} ${item.country_name}`" :value="item.country_code"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="ml">
        <el-input size="small" v-model="params.weight" clearable placeholder="净重(KG) / 立方(CBM)"></el-input>
      </el-col>
      <el-col :span="5" class="ml">
        <el-select size="small" v-model="params.package_type" filterable clearable placeholder="包裹类型">
          <el-option v-for="item in packageList" :key="item.type" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5" class="ml">
        <el-input size="small" v-model="params.zip_code" clearable placeholder="邮编"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-input size="small" v-model="params.length" type="number" clearable placeholder="长"></el-input>
      </el-col>
      <el-col :span="1">
        <div class="desc">X</div>
      </el-col>
      <el-col :span="3">
        <el-input size="small" v-model="params.width" type="number" clearable placeholder="宽"></el-input>
      </el-col>
      <el-col :span="1">
        <div class="desc">X</div>
      </el-col>
      <el-col :span="3">
        <el-input size="small" v-model="params.height" type="number" clearable placeholder="高"></el-input>
      </el-col>
      <el-col :span="1">
        <div class="desc">CM</div>
      </el-col>
      <el-col :span="3" style="margin-left:25px;">
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" plain @click="reset">重置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    countryList: {
      //国家列表
      type: Array,
      default: () => []
    },
    packageList: {
      //包裹列表
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      params: {
        country_code: '', //目的国家
        weight: '', //货物重量
        length: '', //货物长度
        width: '', //货物宽度
        height: '', //货物高度
        zip_code: '', //邮编
        package_type: '' //包裹类型
      }
    };
  },
  watch: {
    packageList(newVal) {
      newVal.forEach(el => {
        if (el.type == 'W') {
          this.params.package_type = el.type;
        }
      });
    }
  },
  methods: {
    search() {
      if (this.params.country_code == '' || this.params.weight == '') {
        this.$message.warning('目的国家 和 货物重量必填');
        return;
      }

      this.$emit('search', this.params);
    },
    reset() {
      for (let i in this.params) {
        this.params[i] = '';
      }
      this.$emit('reset', this.params);
    }
  }
};
</script>

<style lang="scss" scoped>
.const-search {
  background: #f9fcfb;
  padding: 22px 27px;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 60px;
  box-shadow: 0px 0px 7px 0px rgba(30, 30, 30, 0.15);
  /deep/ .el-select {
    display: block;
    width: 100%;
  }
  /deep/ .el-input__inner {
    border: 1px solid #dcdfe6 !important;
    border-radius: 3px;
  }
  .ml {
    margin-left: 60px;
  }
  .desc {
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: #999999;
    font-size: 14px;
  }
}
.title {
  font-size: 22px;
  color: #007947;
  font-weight: 400;
  span {
    color: #999999;
    font-size: 12px;
    margin-top: 6px;
  }
}
</style>
