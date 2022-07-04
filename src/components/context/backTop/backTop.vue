<!--  -->
<template>
  <div class="backtop">
      <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
name:'backTop'
}

</script>

<style  scoped>
.backtop{
    position: fixed;
    right: 8px;
    bottom: 55px;
    z-index: 999;
}
.backtop img{
    height: 43px;
    width: 43px;
}

</style>
