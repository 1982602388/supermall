<!--  -->
<template>
 <swiper>
        <swiper-item v-for="(item, i) in banners" :key="i">
            <a :href="item.link">
                <img :src="item.image" alt="swiper-image" @load="ImgLoad">
            </a>
        </swiper-item>
    </swiper>
  
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
name:'swiperhome',
props:{
    banners:{
        type:Array,
        default(){
            return []
        }
    }
},
data(){
    return{
        isLoad:false
    }
},

components:{
    Swiper,
    SwiperItem
},

methods:{

    ImgLoad(){
        
            if(!this.isLoad){
                 this.$emit('ImgLoad')
                 this.isLoad=true
            }
            
        }
       
    }
}


</script>

<style  scoped>

</style>
