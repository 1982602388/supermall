<!--  -->
<template>
      
          <swiper  class="swiper-item" >
          <swiper-item v-for="item in topImages" :key="item.id" @load="imgLoad">
              
              <img :src="item" alt="">
          </swiper-item>
      </swiper>

      
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
name:'DetailSwiper',
components:{
    Swiper,
    SwiperItem
},

props:{
    topImages:{
        type:Array,
        default(){
            return []
        }
    }
    
},
methods:{
    imgLoad(){
        this.$emit("imgload")
    }
}
}

</script>

<style  scoped>

    .swiper-item{
        height: 300px;
    }
</style>
