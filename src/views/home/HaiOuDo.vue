
<template>
  <div class="haiou-do-box">
    <title-tip titles="海鸥可以做什么"></title-tip>

    <div class="haiou-do">
      <div class="item">
        <div class="img-box">
          <img src="./../../assets/images/tu01.png" alt>
          <img class="size-icon" src="./../../assets/images/ico01.png" alt>
        </div>
        <h6>丰富的物流资源</h6>
        <p>基于跨境眼服务平台，从近600家物流专线及海外仓服务商中精选高质量的物流合作伙伴。</p>
      </div>
      <div class="item">
        <div class="img-box">
          <img src="./../../assets/images/tu02.png" alt>
          <img class="size-icon" src="./../../assets/images/ico02.png" alt>
        </div>
        <h6>优质的服务团队</h6>
        <p>海鸥具备雄厚的科技人才储备，服务团队经过专业的培训；实现整个流程的全程跟踪，让客户从下单到成交无任何后顾之忧。</p>
      </div>
      <div class="item">
        <div class="img-box">
          <img src="./../../assets/images/tu03.png" alt>
          <img class="size-icon" src="./../../assets/images/ico03.png" alt>
        </div>
        <h6>完善的发货流程</h6>
        <p>支持FBA头程备货计划建单以及第三方海外仓发货对接，一键下单同步物流服务商，无需再次线下委托发货。</p>
      </div>
      <div class="item">
        <div class="img-box">
          <img src="./../../assets/images/tu04.png" alt>
          <img class="size-icon" src="./../../assets/images/ico04.png" alt>
        </div>
        <h6>个性化的服务</h6>
        <p>通过平台的物流资源整合匹配适合于电商卖家的最佳物流解决方案，提供性价比较高的物流产品服务。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<script>
import TitleTip from '@/components/common/TitleTip';

export default {
  components: {
    TitleTip
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.haiou-do-box {
  width: 100%;
  padding: 30px 0;
}
.haiou-do {
  margin-top: 20px;
  // overflow: hidden;
  display: flex;
  .item {
    flex: 1;
    margin-right: 20px;
    height: 360px;
    border-radius: 5px;
    background: #f1f1f1;
    cursor: pointer;
    @include transitons(0.2s);
    &:hover {
      box-shadow: 0px 2px 20px 2px #bdb7b7;
      background: #fff;
      .img-box {
        height: 160px;
      }
    }
    &:last-child {
      margin-right: 0;
    }
    .img-box {
      width: 100%;
      height: 200px;
      overflow: hidden;
      position: relative;
      @include transitons(0.2s);
      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      .size-icon {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 97;
        width: 81px;
        height: 90px;
      }
    }
    h6 {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      text-align: center;
      font-weight: bold;
      color: #333;
    }
    p {
      height: 100px;
      font-size: 14px;
      padding: 10px 15px;
      line-height: 20px;
      color: #666;
    }
  }
}
</style>


