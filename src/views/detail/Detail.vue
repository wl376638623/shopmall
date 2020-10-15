<template>
  <div id="detail">
   <detail-nav-bar class="detail-nav"></detail-nav-bar>
 <scroll class="content" ref="scroll">
   <detail-swiper :top-images="topImages"></detail-swiper>
   <detail-base-info :goods="goods"></detail-base-info>
   <detail-shop-info :shop="shops"></detail-shop-info>
   <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
   <detail-param-info :param-info="paramInfo"></detail-param-info>
   <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
 </scroll>
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

  import Scroll from "../../components/common/scroll/Scroll";

  import {getDetail,Goods,Shop,GoodsParam} from "network/detail";

  export default {
        name: "detail",
      components :{
        DetailNavBar,
        DetailSwiper,
        DetailGoodsInfo,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailParamInfo,
        DetailCommentInfo
      },
      data(){
        return {
          iid : null,
          topImages:[],
          goods:{},
          shops:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{}

        }
      },
      created() {
          //1.保存传入的iid
          this.iid = this.$route.params.iid
          //2.根据iid请求详情数据
        getDetail(this.iid).then(res =>{
          //1.获取顶部图片轮播数据
          console.log(res);
          const data = res.result;
          this.topImages = data.itemInfo.topImages
          //2.获取商品信息
          this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
          //3.创建店铺信息的对象
          this.shops=new Shop(data.shopInfo)
          //4.获取商品详细信息
          this.detailInfo = data.detailInfo
          //5.获取参数的信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //6.取出评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0]
          }
        })
      },
      methods:{
        imageLoad(){
          this.$refs.scroll.refresh()
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
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
