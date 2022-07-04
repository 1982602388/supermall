import { debounce } from "./utils";
import backTop from 'components/context/backTop/backTop.vue'

export const imgListenerMixin = {
  data() {
    return {
      // 监听图片
      imgListener: null,
      newRefresh:null
    };
  },
  mounted() {
    // 给防抖函数赋值一个新的函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 50);

    // 接收发射的事件总线,并用监听图片变量保存
    this.imgListener = () => {
      this.newRefresh();
     
    };
    this.$bus.$on("imgLoad", this.imgListener);
    
  }
};

export const backTopMixin = {
  components:{
    backTop
  },
  data() {
    return {
      // 当前滚动的位置
      
      //判断按钮显示
      isShow:false,
    };
  },
  methods: {
    // 回到顶部
    backTop() {
      // 调用子组件里面封装的scrollTo方法即可
      this.$refs.scroll.scrollTo(0, 0,300);
    },
    //需要在组件中的methods中再次回调（this.listenShowBackTop)
    //因为混入抽取生命周期的函数会合并，但抽取methods中函数里面的语句会被覆盖，所以不能抽取
    //但非要抽取时，需新创一个函数，然后再到组件中回调
    listenShowBackTop(position){
      //tabTop是否显示
      this.isShow=-position.y>1000
    },
  }
};
