
<template>
  <div class="logistics">
    <title-tip titles="海鸥派物流产品时效分析"></title-tip>

    <div class="logistics-box">
      <div class="left fl">
        <div class="typesof">
          <span>类别</span>
        </div>
        <div class="typesof-item">
          <div class="typesof-item-y">
            <div class="typesof-item-tip">
              <p>海运</p>
              <!-- <p><span>649</span>家</p> -->
            </div>
          </div>
          <div class="typesof-item-y">
            <div class="typesof-item-tip">
              <p>空运</p>
              <!-- <p><span>649</span>家</p> -->
            </div>
          </div>
          <!-- <div class="typesof-item-y">
                        <div class="typesof-item-tip">
                            <p>小包</p>
                        </div>
          </div>-->
        </div>
      </div>
      <div class="right fr">
        <div class="typesof">
          <span v-for="(item, index) in countryList" :key="index" :class="{'countey-active':counteyCurrent == index}" @click="handeleClickCountry(index)">{{item.name}}</span>
        </div>
        <div class="zhou-item">
          <div class="item" v-for="(item,index) in dataList" :key="index">
            <p class="country-name">
              <img :src="item.url" alt>
              {{item.name}}
            </p>
            <p class="country-day">
              平均时效:
              <span>{{item.day}}</span>
              {{item.dayTip}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTip from '@/components/common/TitleTip';

export default {
  data() {
    return {
      countryList: [{ name: '美国', day: '11' }, { name: '欧洲', day: '11' }],
      dataList: [
        { name: '美国空运快线-普货', day: '7-10', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美国空运快线-带电', day: '6-9', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美森快船', day: '18-20', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '普通快船', day: '22-24', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美国海卡', day: '28-36', dayTip: '自然日', url: require('@/assets/images/countryicon/mg.png') }
      ],
      europeList: [
        { name: '欧洲空运快线(含税)', day: '5-10', dayTip: '工作日', url: require('@/assets/images/countryicon/oz.png') },
        { name: '欧洲空运快线(自税)', day: '6-9', dayTip: '工作日', url: require('@/assets/images/countryicon/oz.png') },
        { name: '欧洲空运普快(含税)', day: '7-9', dayTip: '工作日', url: require('@/assets/images/countryicon/oz.png') },
        { name: '欧洲空运速快(含税)', day: '6-8', dayTip: '工作日', url: require('@/assets/images/countryicon/oz.png') },
        { name: '英国海快专线(自税)', day: '24-28', dayTip: '自然日', url: require('@/assets/images/countryicon/yg.png') },
        { name: '德国海快专线(自税)', day: '40-45', dayTip: '自然日', url: require('@/assets/images/countryicon/dg.png') },
        { name: '英国海卡专线(自税)', day: '38-45', dayTip: '工作日', url: require('@/assets/images/countryicon/yg.png') }
      ],
      USAList: [
        { name: '美国空运快线-普货', day: '7-10', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美国空运快线-带电', day: '6-9', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美森快船', day: '18-20', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '普通快船', day: '22-24', dayTip: '工作日', url: require('@/assets/images/countryicon/mg.png') },
        { name: '美国海卡', day: '28-36', dayTip: '自然日', url: require('@/assets/images/countryicon/mg.png') }
      ],
      counteyCurrent: 0
    };
  },
  methods: {
    handeleClickCountry(index) {
      this.counteyCurrent = index;
      if (index == 0) {
        this.dataList = this.USAList;
      } else if (index == 1) {
        this.dataList = this.europeList;
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
  padding: 30px 0;
  .logistics-box {
    margin-top: 20px;
    padding: 20px;
    box-shadow: 0px 2px 2px #f3f3f3;
    // height: 450px;
    height: 330px;
    .left {
      width: 450px;
      height: 100%;
      .typesof {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        cursor: pointer;
        span {
          font-size: 16px;
        }
      }
      .typesof-item {
        width: 100%;
        height: 360px;
        .typesof-item-y {
          height: 100px;
          margin-bottom: 20px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          @include transitons(0.2s);
          cursor: pointer;
          &:nth-of-type(1) {
            background: url('./../../assets/images/tu05.png') no-repeat center center;
            background-size: 100% 100%;
          }
          &:nth-of-type(2) {
            background: url('./../../assets/images/tu06.png') no-repeat center center;
            background-size: 100% 100%;
          }
          &:nth-of-type(3) {
            background: url('./../../assets/images/tu07.png') no-repeat center center;
            background-size: 100% 100%;
          }
          &:hover {
            background-size: 115% 115%;
            .typesof-item-tip {
              background: rgba($color: #000000, $alpha: 0.6);
            }
          }

          .typesof-item-tip {
            width: 80px;
            height: 80px;
            background: rgba($color: #000000, $alpha: 0.4);
            border-radius: 50%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            p {
              height: 80px;
              line-height: 80px;
              font-size: 15px;
              color: #fff;
              text-align: center;
            }
          }
        }
        .typesof-item-y:last-child {
          margin-bottom: 0;
        }
      }
    }
    .right {
      width: 680px;
      height: 100%;
      .typesof {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
        span {
          font-size: 16px;
          padding: 0 8px;
          color: #999;
          cursor: pointer;
          &.countey-active {
            color: #007947;
          }
        }
      }
      .zhou-item {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        .item {
          width: 205px;
          margin-left: 20px;
          margin-bottom: 20px;
          height: 70px;
          padding: 10px 0;
          background: #f1f1f1;
          border-radius: 3px;
          @include transitons(0.2s);
          &:hover {
            background: #007947;
            p {
              color: #fff;
              font-size: 15px;
            }
            span {
              // color: #FF9027;
              color: #fff !important;
            }
          }
          p {
            text-align: center;
            height: 20px;
            line-height: 20px;
            cursor: pointer;
          }
          .country-name {
            color: #333;
            font-size: 14px;
            letter-spacing: 1px;
            img {
              vertical-align: middle;
              width: 20px;
            }
          }
          .country-day {
            letter-spacing: 1px;
            color: #666;
            font-size: 12px;
            margin-top: 8px;
            span {
              color: #ff9027;
            }
          }
        }
      }
    }
  }
}
</style>
