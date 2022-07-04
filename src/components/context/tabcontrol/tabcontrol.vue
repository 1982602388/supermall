<!--  -->
<template>
  <div class="tabcontrol">
      <div class="tab-item" 
      v-for="(item,index) in titles" 
      :key="index"
       :class="{active:index===currentIndex}"
       @click="itemclick(index)">
          <span>{{item}}</span>
      </div>
     
  </div>
</template>

<script>
export default {
name:'tabcontrol',
props: {
    titles:{
        type:Array,
        default(){
            return []
        }
    }
},
data(){
    return{
        currentIndex:0
    }
},
methods: {
    itemclick(index){
        this.currentIndex=index;
        this.$emit('itemclick',index)
    }
}
}

</script>

<style  scoped>
.tabcontrol{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;

}
.tab-item{
    flex: 1;
}
.active{
    color: var(--color-high-text);
   
}
.active span{
     border-bottom: 3px solid var(--color-tint);
     padding: 5px;

}

</style>
