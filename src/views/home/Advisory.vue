
<template>
  <div class="advisory">
    <title-tip titles="物流资讯"></title-tip>

    <div class="advisory-box" v-loading="newsLoading">
      <div class="item">
        <div class="img-box" @click="toDetail(newsOne.id)">
          <img :src="newsOne.img" alt>
          <p>{{newsOne.title}}</p>
        </div>
        <div class="news-list">
          <p v-for="(item,index) in newsList.leftNews" :key="index" @click="toDetail(item.id)">{{item.title}}</p>
        </div>
      </div>

      <div class="item">
        <div class="img-box" @click="toDetail(middleTwo.id)">
          <img :src="middleTwo.img" alt>
          <p>{{newsOne.title}}</p>
        </div>
        <div class="news-list">
          <p v-for="(item,index) in newsList.middleNews" :key="index" @click="toDetail(item.id)">{{item.title}}</p>
        </div>
      </div>

      <div class="item">
        <div class="img-box" @click="toDetail(rightThree.id)">
          <img :src="rightThree.img" alt>
          <p>{{rightThree.title}}</p>
        </div>
        <div class="news-list">
          <p v-for="(item,index) in newsList.rightNews" :key="index" @click="toDetail(item.id)">{{item.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleTip from '@/components/common/TitleTip';
import { getBottomNews } from '@/api/seabulk';

export default {
  data() {
    return {
      newsList: {
        leftNews: [],
        middleNews: [],
        rightNews: []
      },
      newsOne: {},
      middleTwo: {},
      rightThree: {},
      newsLoading: false
    };
  },
  created() {
    this.getBottomNews();
  },
  methods: {
    toDetail(id) {
      let detailUrl = `http://${window.location.host}/#/articl-detail/${id}`;
      window.open(detailUrl, '_blank');
    },
    async getBottomNews() {
      this.newsLoading = true;
      try {
        let datas = await getBottomNews();
        this.newsOne = datas[0];
        this.middleTwo = datas[1];
        this.rightThree = datas[2];
        this.newsList.leftNews = datas.slice(3, 6);
        this.newsList.middleNews = datas.slice(6, 9);
        this.newsList.rightNews = datas.slice(9, 12);
      } catch (error) {
        this.$message.error(error.message);
      }
      this.newsLoading = false;
    }
  },
  components: {
    TitleTip
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/global.scss';
.advisory {
  width: 100%;
  padding: 30px 0;
  .advisory-box {
    margin-top: 20px;
    display: flex;
    align-items: stretch;
    position: relative;
    .item {
      height: 400px;
      flex: 1;
      margin: 0 5px;
      .img-box {
        width: 100%;
        height: 250px;
        border: 1px solid #f1f1f1;
        border-radius: 3px;
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          height: 200px;
        }
        p {
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          width: 385px;
          color: #333;
          @include ellipsis;
          padding: 0 20px;
          cursor: pointer;
        }
      }
      .news-list {
        height: 150px;
        background: #fff;
        margin-top: 20px;
        p {
          height: 30px;
          width: 385px;
          @include ellipsis;
          line-height: 30px;
          font-size: 14px;
          color: #666;
          padding: 0 20px;
          cursor: pointer;
          &:hover {
            color: #007947;
          }
        }
      }
    }
  }
}
</style>
