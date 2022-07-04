<!--  -->
<template>
  <div class="cart">
     <navbar class="navbar">
       <div slot="nav-center">购物车({{length}})</div>
     </navbar>
     <!-- 购物车列表 -->
       <cart-list />
   
    <!-- 总计模块 -->
      <cart-bottom/>
  </div>
</template>

<script>
import navbar from 'components/common/navtab/NavTab'
import CartBottom from './child/CartBottom.vue'
import cartList from './child/cartList.vue'


import{ mapGetters } from 'vuex'
export default {
name:'cart',
components:{
  navbar,
  cartList,
  CartBottom
  
},
computed: {
  // ...mapGetters(['cartLength'])
  ...mapGetters({
    length:'cartLength'
  })
}
}

</script>

<style  scoped>
  .cart{
    height: 100vh;
  }
  .navbar{
    background-color: var(--color-tint);
  }
  
</style>
