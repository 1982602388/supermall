<!--  -->
<template>
  <div class="recommend">
      <div v-for="(item,i) in recommends" :key="i" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" >
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
name:'recommendview',
props: {
    recommends:{
        type:Array,
        default(){
            return []
        }
    }
}
}

</script>

<style  scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 8px 0 10px;
        border-bottom: 10px solid #eee;
    }
    .recommend-item{
        flex: 1;
        
    }
    .recommend-item img{
        width: 60px;
      margin-bottom: 6px;
      
    }
</style>
