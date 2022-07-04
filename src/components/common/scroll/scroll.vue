<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
      <div class="content" >
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
name:'scroll',
props: {
    probeType:{
        type:Number,
        default:0
    },
    pullUpLoad:{
        type:Boolean,
        default:false
    }
},
data(){
    return{
        scroll:null
    }
},
methods: {
     scrollTo(x, y,time){
       this.scroll&& this.scroll.scrollTo(x,y,time)
    },
    refresh(){
       
       this.scroll&& this.scroll.refresh()
    }
      
},
mounted (){
    this.scroll=new BScroll(this.$refs.wrapper,{
        //拖不动时加入这个observeDOM:true属性
        observeDOM:true,
        observeImage:true,
        click:true,
        probeType: this.probeType,
        //加载更多
        pullUpLoad:this.pullUpLoad,

    })

    this.scroll.on( "scroll", (position)=>{
        
        this.$emit("scroll",position)
    })


    //解决滚动卡顿
    this.scroll.refresh()

    this.scroll.on("pullingUp", ()=>{
        this.$emit("pullingUp")
    })


   
}
}

</script>

<style  scoped>

</style>
