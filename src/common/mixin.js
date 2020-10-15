import {debounce} from "./utils";

export const itemListenerLixin = {
  data(){
    return {
      itemImgListener : null,
      newRefresh:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,200)
    this. itemImgListener= ()=>{
      this.newRefresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }

}
