<template>
  <div class="home">
    <my-baner></my-baner>

    <div class="content">
      <hai-ou-do></hai-ou-do>
      <logistics-product></logistics-product>
      <advisory></advisory>
    </div>
  </div>
</template>

<script>
import MyBaner from './Baner';
import HaiOuDo from './HaiOuDo';
import LogisticsProduct from './LogisticsProduct';
import Advisory from './Advisory';

export default {
  components: {
    MyBaner,
    HaiOuDo,
    LogisticsProduct,
    Advisory
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.content {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
