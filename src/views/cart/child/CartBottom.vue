<!--  -->
<template>
  <div class="CartBottom">
      <div class="check-content">      
              <checkBox class="check-buttom" 
              
                        :is-check="isSelectAll"
                        @click.native="all"/>
                <span>
                  全选
              </span>   
                 
      </div>
      <div class="price">
                  总计：<span class="relprice">{{tatolprice}}</span>
                  </div> 
        <div class="culcalate" @click="calcSelect">
            去计算（{{checklenght}}）
        </div>
  </div>
</template>

<script>
import checkBox from 'components/context/checkBox/CheckBox.vue'
import {mapGetters} from 'vuex'
export default {
name:'CartBottom',
components:{
    checkBox,
},

computed: {
    ...mapGetters(['cartList']),
    tatolprice(){
        return "￥"+this.cartList.filter(item=>{
            return item.checked
        }).reduce((preValue,item)=>{
            return preValue+item.price*item.count
        },0).toFixed(2)
    },
    checklenght(){
        return this.cartList.filter(item=>item.checked).length
    },

    isSelectAll(){
        if(this.cartList.length===0) return false
       
       //this.cartList.find(item=>!item.checked)加购后的商品不选中的
       //再取反
        return !this.cartList.find(item=>!item.checked)
    },
    
},
methods: {
    //商品全部选中
    all(){
      if(this.isSelectAll){
          this.cartList.forEach(item=>item.checked=false)
      }
      else{
          this.cartList.forEach(item=>item.checked=true)
         
      }
    },
    //toast跳出
    calcSelect(){
        if(!this.isSelectAll){
            this.$toast.show('请选择购买商品',2000)
        }
    }
}
}

</script>

<style  scoped>
    .CartBottom{
        background-color:#eee;
        height: 44px;
        line-height: 44px;
        width: 100%;
        position:absolute;
        bottom: 49px;
        display: flex;
        font-size: 14px;
    }
    .check-content{
        width: 70px;
        display: flex;
        margin-left: 10px;
        align-items: center;
    }
    
    .check-buttom{
        height: 25px;
        width: 25px;
        line-height: 25px;
        margin-right: 5px;
    }
    .price{
        margin-left: 20px;
        flex: 1;
    }
    .culcalate{
        margin-top: 8px;
        margin-right: 5px;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color:rgb(236, 10, 10);
        border-radius: 20px;
        color:#fff;
    }
    .relprice{
        color: rgb(230, 26, 26);
        font-size: 20px;
        font-weight: 700;
    }
</style>
