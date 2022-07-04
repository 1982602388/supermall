<!--  -->
<template>
   <div>
 <tab-bar>
       <tab-bar-item path="/home" >
        <img slot="item-icon" src="~assets/img/tabBar/首页.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabBar/active/首页.png" alt="">

        <div slot="item-text">首页</div>             
      </tab-bar-item>
      <tab-bar-item path="/category" >
        <img slot="item-icon" src="~assets/img/tabBar/分类.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabBar/active/分类.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" >
         <img slot="item-icon" src="~assets/img/tabBar/购物车.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tabBar/active/购物车.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" >
        <img slot="item-icon" src="~assets/img/tabBar/我的.png" alt="">
        <img slot="item-icon-active" src="~assets/img/tabBar/active/我的.png" alt="">
        <!-- 给item传入active图片 -->
        <div slot="item-text">我的</div>
      </tab-bar-item>
       </tab-bar>
   </div>
</template>

<script>
import TabBar from 'components/common/TabBar/TabBar.vue'
import TabBarItem from 'components/common/TabBar/TabBarItem.vue'

export default {
name:'mainTab',
components: {
    TabBarItem,
    TabBar
}
}

</script>

<style  scoped>

</style>
