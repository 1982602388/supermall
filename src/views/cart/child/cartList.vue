<!--  -->
<template>
  <div class="cartList">
      <scroll    class="content" 
                @pullingUp="true"
                ref="scroll">
          <cart-list-item v-for="item in cartList" 
                            :key="item.id"
                            :item-info="item">
                           

          </cart-list-item>

      </scroll>
  </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'
import cartListItem from './cartListItem.vue'
import {mapGetters} from 'vuex'
export default {
name:'cartList',
components: {
    scroll,
    cartListItem
},
computed: {
    ...mapGetters(['cartList'])
    
},
activated () {
    this.$refs.scroll.refresh()
}
}

</script>

<style  scoped>
.cartList{
    height: 100vh;
    position: relative;
}
.content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 49px;
    overflow: hidden;
  }

</style>
