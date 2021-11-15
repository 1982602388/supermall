<!--  -->
<template>
  <div id="home">
    
          <nav-tab class="home-nav">
            <div slot="nav-center">首页</div>
          </nav-tab>

<tabcontrol class="control" 
                      :titles="['流行','新款','精选']"
                      @itemclick="itemclick"
                      ref="tabControl1"
                     
                      v-show="tabshow" 
                      />


    <scroll class="content"
             ref="scroll" 
             :probe-type="3" 
             @scroll="contentscroll"
             :pull-up-load="true"
             @pullingUp="morepull">
          <swiperhome :banners="banners"   @ImgLoad="tabLoad"/>
          <recommendview :recommends="recommends" /> 
          <featrueview/>

          <tabcontrol class="control-item" 
                      :titles="['流行','新款','精选']"
                      @itemclick="itemclick"
                      ref="tabControl2"
                       />

          <goods-list :goods="showGoods" />
    </scroll>


    <!--native 直接监听组件点击按钮 -->
    <back-top  @click.native="backTop"  v-show="isShow" />

    
  </div>
</template>

<script>

import {gethomeData,getHomeGoods} from 'network/home.js'

import swiperhome from './children/swiperhome.vue'
import recommendview from './children/recommendview.vue'
import featrueview from './children/featrueview.vue' 

import tabcontrol from 'components/context/tabcontrol/tabcontrol.vue'
import GoodsList from 'components/context/goods/GoodsList.vue'
import NavTab from 'components/common/navtab/NavTab'
import scroll from 'components/common/scroll/scroll.vue'
// import backTop from 'components/context/backTop/backTop.vue'

// import debounce from 'common/utils.js'
import {imgListenerMixin,backTopMixin} from 'common/mixin.js'


export default {
name:'home',
components:{
  NavTab,
  swiperhome,
  recommendview,
  featrueview,
  tabcontrol,
  GoodsList,
  scroll,
},

data(){
  return{
    banners:[],
    recommends:[],
    goods:{
      'pop':{page:0,list:[]},
      'new':{page:0,list:[]},
      'sell':{page:0,list:[]},
      
    },
    
    currentType:'pop',
    taboffsetTop:0,
    tabshow:false,
    
  

  }
},
computed: {
  showGoods(){
    return this.goods[this.currentType].list
  }
},
created(){
 this.gethomeData()

  this.getHomeGoods('pop')
  this.getHomeGoods('new')
  this.getHomeGoods('sell')
},
activated () {
  this.$refs.scroll.refresh()
  this.$refs.scroll.scrollTo(0,this.saveY,0)
  
  
  
},
deactivated () {
  //1.保存Y值
  this.saveY=this.$refs.scroll.scroll.y

  //2.取消全局事件的监听
  //this.itemImgListenter在mixin中
  this.$bus.$off('itemImgLoad',this.itemImgListenter)
 
  
},
mixins: [imgListenerMixin,backTopMixin],
mounted () {
  this.itemclick(0)
  //事件总线  接收
  //需要在挂载中执行 不然scroll.vue里面的mounted的scroll
  //在这里的create中会执行太快接收不到而报错
  //这个地方img标签确实被挂载，但是其中的图片还没有占据高度
 /*  const newrefresh = debounce(this.$refs.scroll.refresh,500)
  /* this.$bus.$on("itemImgLoad",()=>{  
    newrefresh(20,30,'abc')   
  })
 */
// this.itemImgListenter=()=>{newrefresh()}
// this.$bus.$on('itemImgLoad',this.itemImgListenter)

//在上面的deactivated ()实现取消事件总线
// deactivated () {
//   this.$bus.$off('itemImgLoad',this.itemImgListenter)
//   }
//防抖动已经用mixins混入实现
},

methods:{
 //轮播图加载后再获取offsetTop的值
tabLoad(){
  
   this.taboffsetTop=this.$refs.tabControl2.$el.offsetTop;
}, 
  // backTop的位置

contentscroll(position){
 //决定是否吸顶效果
  this.tabshow=-position.y>this.taboffsetTop
  
   this.listenShowBackTop(position)
},

//上拉加载更多
morepull(){
  //该函数表示 
  this.getHomeGoods(this.currentType)
  
},

// 事件监听模块
itemclick(index){
switch(index){
  case 0:
    this.currentType = 'pop'
    break
    case 1:
      this.currentType='new'
      break
      case 2:
        this.currentType='sell'

}

//让两个tabcontrol组件的点击位置一直
this.$refs.tabControl1.currentIndex=index
this.$refs.tabControl2.currentIndex=index

},






  /**网络请求模块 */
  gethomeData(){
    //获取到数据：res
    gethomeData().then(res=>{
    this.banners=res.data.banner.list;
    this.recommends=res.data.recommend.list;
  })
  },
  getHomeGoods(type){
    const page=this.goods[type].page+1;
    getHomeGoods(type,page).then(res=>{
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1;

//结束上拉 从新拉取
      this.$refs.scroll.scroll.finishPullUp();
     
    })

  }
}
}

</script>

<style  scoped>
#home{
  position: relative;
  padding-top: 44px;
  height: 100vh;
  

}
.home-nav{
  background-color: var(--color-tint);
  color: #fff;
  /* 原生滚动时 */
  position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 19;
}
/* .control-item{
  position: sticky;
  top: 44px;
  z-index: 2;
} */
.content{
 /*  滚动区域    父元素需要加入高度撑开   100vh(100视口+) */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0 ; 
  overflow: hidden;
}
.control{
  position: relative;
  
   z-index: 9;
}
</style>
