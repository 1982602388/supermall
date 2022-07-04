<!--  -->
<template>
  <div id="DetailNavBar">
      <nav-tab >
          <div slot="nav-left" class="left" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div  slot="nav-center" class="title">
             <div v-for="(item,index) in title" 
                :key="index" 
                class="center"
                @click="titleClick(index)"
                :class="{active: currentIndex===index}">
                {{item}}
                </div> 
          </div>
      </nav-tab>
  </div>
</template>

<script>
import NavTab from 'components/common/navtab/NavTab'
export default {
name:'DetailNavBar',
components: {
    NavTab,

},
data(){
    return{
        title:['商品','参数','评论','推荐'],
        currentIndex:0,

    }
},
methods:{
    titleClick(index){
        this.currentIndex=index
        this.$emit("titleClick",index)
    },
    backClick(){
        this.$router.go(-1)
    }

}
}

</script>

<style  scoped>
    .title{
        display: flex;
        font-size: 13px;
    }
    .center{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .left{
        
        margin-top: 5px;
    }
</style>
