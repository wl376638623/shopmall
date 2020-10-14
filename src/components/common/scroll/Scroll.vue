<template>
    <div class="wrapper" ref="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
      props:{
        probeType: {
          type:Number,
          default : 0
        },

      },
      data(){
          return {
            scroll:null
          }
      },
      methods:{
        scrollTo(x,y,time){
         this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
        },
        finishPullUp(){
          this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        refresh(){

          this.scroll && this.scroll.refresh()
        }
      },
      mounted() {
          //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,
          pullUpLoad :this.pullUpLoad
        })
        //2.监听滚动位置
        this.scroll.on('scroll',(position)=>{
          this.$emit('scroll',position)
        })
          this.scroll.refresh()
      }
    }
</script>

<style scoped>

</style>
