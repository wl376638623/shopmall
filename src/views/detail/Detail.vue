<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shops"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
<!--    <toast :message="message" :show="show"></toast>-->

  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";
  // import Toast from "../../components/common/toast/Toast";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {debounce} from "../../common/utils";
  import {itemListenerLixin} from "../../common/mixin";



  export default {
    name: "detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailGoodsInfo,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      BackTop,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,

    },
    mixins: [itemListenerLixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
        isShowBackTop: false,
        // message:'',
        // show:false


      }
    },

    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        //1.获取顶部图片轮播数据
        console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.创建店铺信息的对象
        this.shops = new Shop(data.shopInfo)
        //4.获取商品详细信息
        this.detailInfo = data.detailInfo
        //5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
      //4.给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

      }, 100)

    },
    mounted() {

    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)

    },
    methods: {
      imageLoad() {
        this.newRefresh()
        this.getThemeTopY()

      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position) {
        // console.log(position);
        //1.获取Y值
        const positionY = -position.y;
        //2.positionY和主题中的值进行对比
        const length = this.themeTopYs.length;
        for (let i = 0; i < length; i++) {
          if (this.currentIndex != i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])
            || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

      },
      //3回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //2.决定tabControl会否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      //4.添加购物车
      addToCart() {
        //1.获取购物车需要展示的信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        //将商品添加到购物车中
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addToCart',product).then(res =>{
          // this.show = true;
          //   this.message = res;
          // setTimeout(()=>{
          //   this.show=false;
          //   this.message = ''
          // },1000)
          this.$toast.show(res,1000)
        })

      }
    },

  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
