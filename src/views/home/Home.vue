<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMutidata} from "network/home";

  export default {
      name: "Home",
      components: {
          NavBar
        },
    data(){
        return {
          banners:[],
          recommends:[]
        }
    },
    created() {
      //1.请求多个数据
      getHomeMutidata().then(res =>{
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends =res.data.recommend.list;
      } )
    },
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
