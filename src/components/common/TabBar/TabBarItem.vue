<!--  -->
<template>
  <div class="tab-item" @click="btnclick">
          <div v-if="!isActive"><slot name="item-icon"></slot></div>
          <div v-else><slot name="item-icon-active"></slot></div>
           <!-- 给tabBaritem传入active图片 -->
          <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
</template>

<script>
export default {
name:'TabBarItem',
props: {
   path: String,
   activeColor:{
       type:String,
       default:'red'
   }
   },
computed:{
    isActive(){
        return this.$route.path.indexOf(this.path)!==-1
    },
    activeStyle(){
        return this.isActive?{color:this.activeColor}:{}
    }
},
methods: {
    btnclick(){
        this.$router.replace(this.path)
    }
}

}

</script>

<style  scoped>
.tab-item{
  flex: 1; /* 均等分 */
  text-align: center;
  height: 49px;
}
.tab-item img{
    height: 24px;
    width: 24px;
    vertical-align: bottom;
    margin-top: 3px;
}

</style>
