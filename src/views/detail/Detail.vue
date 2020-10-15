<template>
  <div id="detail">
   <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";

  import {getDetail,Goods} from "network/detail";

  export default {
        name: "detail",
      components :{
        DetailNavBar,
        DetailSwiper
      },
      data(){
        return {
          iid : null,
          topImages:[],
          goods:[]
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
        })
      },
    }
</script>

<style scoped>

</style>
