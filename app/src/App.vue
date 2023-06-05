<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'
// import _ from 'lodash'
export default {
  name:'',
  components:{
    Header,
    Footer
  },
  mounted(){
    //通知vue发数据，获取数据,储存在仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>