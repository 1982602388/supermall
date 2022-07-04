<template>
  <div id="category">
    <nav-bar class="category_nav"><template #center>分类</template></nav-bar>
    <div class="main">
      <category-left ref="left" ></category-left>
      <category-right ref="right" :list_item="rightList"></category-right>
    </div>
  </div>
</template>
<script>
import { getCategoryInfo } from "network/category.js";

import CategoryLeft from "./childComps/CategoryLeft.vue";
import CategoryRight from "./childComps/CategoryRight.vue";

import NavBar from "components/common/navtab/NavTab.vue";
export default {
  data() {
    return {
      rightList: null,
      maitKey: 0,
    };
  },
  created() {},
  mounted() {
    console.log();

    // console.log(this.$refs.left.$el.style);
    this.getCategoryInfo(this.maitKey);
  },
  components: {
    NavBar,
    CategoryLeft,
    CategoryRight,
  },

  methods: {
    async getCategoryInfo(maitKey) {
      let res = await getCategoryInfo(maitKey);
      console.log("you", res);
      if (res) {
        this.rightList = res.data.list;
      }
    },
  },
};
</script>
<style scoped>
.category_nav {
  background-color: var(--color-tint);
  color: white;
}
.main {
  display: flex;
  font-size: 0.6rem;
  height: calc(100vh - 2.09rem - 1.9rem);
}
</style>
