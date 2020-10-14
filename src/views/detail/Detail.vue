<template>
  <div id="detail">
    <nav-bar>

    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
    export default {
        name: "detail",
      components :{
        NavBar
      },
      data(){
        return {
          iid : null
        }
      },
      created() {
          this.iid = this.$route.params.iid
      },
    }
</script>

<style scoped>

</style>
