<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
      <scroll class="content" ref="scroll" :probe-type="3"
              @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";

  import FeatureView from "./childComps/FeatureView";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {
    getHomeMutidata,
    getHomeGoods
  } from "network/home";
  import {itemListenerLixin} from "../../common/mixin";

  export default {
      name: "Home",
      components: {
          NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
        },
    mixins:[itemListenerLixin],
    data(){
        return {
          banners:[],
          recommends:[],
          goods:{
            'pop':{page:0,list:[]},
            'new':{page:0,list:[]},
            'sell':{page:0,list:[]},
          },
          currentType :'pop',
          isShowBackTop:false,
          tabOffsetTop: 0,
          isTabFixed:false,
          saveY : 0,


        }
    },
    computed:{

      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
        //取消全局监听事件
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMutidata()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {

    },
    methods:{
      /**
       * 时间监听相关的方法
       *
       */

      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType='new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      backClick(){
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y)>1000
        //2.决定tabControl会否吸顶
        this.isTabFixed = (-position.y)>this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
        this.newRefresh()
      },
      swiperImageLoad(){
        //2.获取tabControl的offsetTop
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       * 网络请求相关方法
       */
      getHomeMutidata(){
        getHomeMutidata().then(res =>{
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends =res.data.recommend.list;
        } )
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }

    }
  }
</script>

<style scoped>
  #home {
   /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
.tab-control {
  position: relative;
  z-index: 9;
}
  /*.content {*/
  /*  height: calc(100%- 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 51px;*/
  /*}*/
</style>
