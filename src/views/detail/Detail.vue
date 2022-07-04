<!--  -->
<template>
  <div id="detail">
            <detail-nav-bar class="nav-bar" 
                            @titleClick="titleClick"
                            ref="nav"/>
                          
    <scroll class="content" 
            ref="scroll"
            :pull-up-load="true"
            @scroll="contentScroll"
            :probe-type="3"> 
            <detail-swiper :top-images="topImages"  />
            <detail-base-info :goods="goods"/>
             <detail-shop-info :shop="shop" />
             <!-- 老师的是imageInfo -->
             <detail-goods-info  :goods-info="goodsInfo"  @ImgLoad="ImgLoad"/>
            <detail-params-info ref="params" :goods-params="goodsParams"/>
            <detail-comment-info ref="comment" :comment-info="commentInfo"  />
             <goods-list ref="recommend" :goods="recommends"/>
      </scroll>
      <!--native 直接监听组件点击按钮 -->
    <back-top  @click.native="backTop"  v-show="isShow" />
    
      <detail-bottom-bar @addcart="addToCart" />
      
      </div>
</template>

<script>
import scroll from 'components/common/scroll/scroll.vue'

import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail.js'

import DetailNavBar from './childrencom/DetailNavBar.vue'
import DetailSwiper from './childrencom/DetailSwiper.vue'
import DetailBaseInfo from './childrencom/DetailBaseInfo.vue'
import DetailShopInfo from './childrencom/DetailShopInfo.vue'
import DetailGoodsInfo from './childrencom/DetailGoodsInfo.vue'
import DetailParamsInfo from './childrencom/DetailParamInfo.vue'
import DetailCommentInfo from './childrencom/DetailCommentInfo.vue'
import DetailBottomBar from './childrencom/DetailBottomBar.vue'

import GoodsList from 'components/context/goods/GoodsList.vue'

import {debounce} from 'common/utils.js'
import{imgListenerMixin,backTopMixin} from 'common/mixin.js'

import {mapActions} from 'vuex'
export default {
name:'Detail',
components: {
    scroll,
  DetailNavBar,  
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailGoodsInfo,
  DetailParamsInfo,
  DetailCommentInfo,
  GoodsList,
  DetailBottomBar
  
},

data(){
    return{
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        goodsInfo:{},
        goodsParams:{},
        commentInfo:{},
        recommends:[],
        themeToY:[],
        getthemeToY:null,
        contentY:null,
        currentIndex:0
        

    }
},
created () {
    //保存传入的iid
    this.iid=this.$route.params.iid

    //根据iid请求详情数据
    getDetail(this.iid).then(res=>{
        //缩短
        const data=res.result;
        console.log(res);

        this.topImages=data.itemInfo.topImages
        
        //获取商品信息
        //baseinfo
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

         // 获取商家信息
         this.shop = new Shop(data.shopInfo)

         //获取商品信息
         this.goodsInfo=data.detailInfo;

         //详情
         this.goodsParams=new GoodsParams(data.itemParams.info,data.itemParams.rule)

         //评论信息
          if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0] || {};
        }
    })
    
    //请求推荐数据
    getRecommend().then(res=>{
        this.recommends=res.data.list
    })

    this.getthemeToY=debounce(()=>{
         this.themeToY=[]
    this.themeToY.push(0);
    this.themeToY.push(this.$refs.params.$el.offsetTop)
    this.themeToY.push(this.$refs.comment.$el.offsetTop)
    this.themeToY.push(this.$refs.recommend.$el.offsetTop)
    //加入最大值作为界限
    this.themeToY.push(Number.MAX_VALUE)
    console.log(this.themeToY);
    },100)
},
mounted () {
    //1.第一次获取，值不对，
    //值不对的原因：this.$refs.params.$el压根没有渲染
   /*  this.themeToY=[]
    this.themeToY.push(0);
    this.themeToY.push(this.$refs.params.$el.offsetTop)
    this.themeToY.push(this.$refs.comment.$el.offsetTop)
    this.themeToY.push(this.$refs.recommend.$el.offsetTop)
    console.log(this.themeToY); */

    //this.$nextTick()数据加载后的下一帧
   /*  this.$nextTick(()=>{ 
        //2.第二次获取值不对
        //值不对的原因：图片没有计算在内
        //根据最新的数据，对应的DOM是已经被渲染出来
        //但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
        //offsetTop值不对的时候，都是因为图片的问题
        this.themeToY=[]
        this.themeToY.push(this.$refs.params.$el.offsetTop)
        this.themeToY.push(this.$refs.comment.$el.offsetTop)
        this.themeToY.push(this.$refs.recommends.$el.offsetTop)
    }) */
},
methods:{

//商品图片列表加载
    ImgLoad(){
        //已经混入了这个函数，可以直接调用
    this.newRefresh();

    //在created定义
    this.getthemeToY();
   },

//点击nav进行定位跳转
titleClick(index){
    this.getthemeToY=this.$refs.scroll.scrollTo(0,-this.themeToY[index],100)
},

//在混入的回调backTop及滚动页面nav的currentIndex跟随
contentScroll(position){
    //回调
    this.listenShowBackTop(position)

    const positionY=-position.y
    // let i in this.themeToY 这样出来的i是字符串 
    // i=i*1转换为数字类型  || i= parseInt(i)转换为数字类型 
   for(let i in this.themeToY){
      i= parseInt(i)
    if(this.currentIndex!==i&&(positionY >= this.themeToY[i] && positionY <this.themeToY[i+1])){
        console.log(i);
         this.currentIndex=i;
        this.$refs.nav.currentIndex=this.currentIndex;
    }  
    } 
//在上面的themeToY中加入最大值作为界限
   /*  for(let i=0;i<this.themeToY.length-1;i++){
        if(this.currentIndex!==i&& positionY>=this.themeToY[i]
        && positionY<this.themeToY[i+1]){
            console.log(i);
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex;
        }
    } */
},

//购物车信息及添加
addToCart(){
    //1.获取购物车需要展示的信息
    const product={}
    product.image=this.topImages[0];
    product.title=this.goods.title;
    product.desc=this.goods.desc;
    product.price=this.goods.realPrice;
    product.iid=this.iid;

    //2.将商品添加到购物车里
    //this.$store.cartList.push(product) 
    //不能这样直接加入，需要在vuex里的mutation中修改
    //addCart对应vuex mutation中的函数，product对应payload

    this.addCart(product).then(res=>{
        console.log(res);
        this.$toast.show(res,2000)
    })
    /* this.$store.dispatch('addCart',product).then(res=>{
        console.log(res);
    }) */
},
//用mapActions来映射在actions.js中promise后的addCart
...mapActions(['addCart'])


},
//混入防抖动事件
mixins: [imgListenerMixin,backTopMixin],

//销毁后取消全局事件总线
destroyed () {
    this.$bus.$off('itemImgLoad',this.imgListener)
}

}

</script>

<style  scoped>
#detail{
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 10;
}

.nav-bar{
    position: relative;
    z-index: 9;
    background-color: #fff;
}
.content{
    
 /*  滚动区域    父元素需要加入高度撑开   100vh(100视口+) */
 /*  position: relative;
  height: calc(100%-44px); */

  position:fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;
    /* height: calc(100%-44px-58px); */
  /* overflow: hidden; */
}

</style>
