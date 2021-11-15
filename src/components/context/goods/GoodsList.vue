<!--  -->
<template>
  <div class="goods-list">
      <goods-list-item v-for="(item,i) in goods" :key="i" :listitem="item" />
      
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
name:'GoodsList',
components:{
    GoodsListItem,

},
props:{
    goods:{
        type:Array,
            default(){
                return []
            }
        
    }
}
}

</script>

<style  scoped>
.goods-list {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>
