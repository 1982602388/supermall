<!--  -->
<template>
  <div class="navtab">
      <div class="left"><slot name="nav-left"></slot></div>
      <div class="center"><slot name="nav-center"></slot></div>
      <div class="right"><slot name="nav-right"></slot></div>
  </div>
</template>

<script>
export default {
name:'NavTab'
}

</script>

<style  scoped>
    .navtab{
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
    }
    .left,.right{
        width: 60px;
    }
    .center{
        flex: 1;
    }
</style>
