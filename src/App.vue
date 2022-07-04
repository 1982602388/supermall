<template>
  <div id="app">
    
   <main-tab></main-tab>
   <keep-alive exclude="Detail">
     <router-view/>
     </keep-alive>
  </div>
</template>

<script>

import mainTab from 'components/context/mainTab/mainTab.vue'
export default {
  name: 'App',
  components: {
   mainTab,
   
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
