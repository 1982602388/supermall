<!--  -->
<template>
  <div>
      <button class="check-button" :class="{checked:isCheck}">
          <img src="~assets/img/cart/tick.svg" alt="">
      </button>
  </div>
</template>

<script>
export default {
name:'CheckBox',
props:{
    isCheck:{
        type:Boolean,
        default:false
    }
}
}

</script>

<style  scoped>
    .check-button{
        border-radius: 50%;
        border: 1px solid #aaa;
    }
    .checked{
        background-color: red;
        border-color: red;
    }
</style>
