<template>
  <div>
    <!-- 我是三级联动全局组件 不需要再次引用-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入其他组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'

export default {
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Brand,
    Floor
  },
  mounted(){
        //获取floor信息
        this.$store.dispatch('getFloorList')
    },
  computed:{
      ...mapState({
          floorList:state=>state.home.floorList
      })
  },

}
</script>

<style>

</style>