import vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getter'

//1.安装插件
vue.use(vuex)

//2.创建store实例
const state={
    cartList:[]
}
const store=new vuex.Store({
    state,
    /* state:{
        cartList:[]
    }, */
    mutations,
    actions,
    getters,
    /* mutations:{
        addCart(state,payload){ */
            //payload新添加的商品
           /*  let oldProduct=null
            for(let item of state.cartList){
                if(item.iid===payload.iid){
                    oldProduct=item;
                }
            } */
            //1.查找之前数组中是否有该商品
            //item.iid=== payload.iid正确时 
            //let oldProduct=item
            // let oldProduct=state.cartList.find(item=>item.iid=== payload.iid)
            //先定义oldProduct,在用item（cartList）里面的商品一个个跟添加进来的新商品payload比较
            //如果item的iid跟payload的iid一样就证明新添加的payload在cartList里面有了
            //然后把这个和新添加的payload商品一样的item赋值给oldProduct
            //到时新添加进来的商品又一样时，就直接给oldProduct.count+1
            //2.判断oldProduct
           /*  if(oldProduct){
               oldProduct.count+=1
            } */
            //如果不一样时就跟新添加进来的payload.count赋值为1
         /*    else{
                payload.count=1
                state.cartList.push(payload)
            }
        }
    } */
   
       
    
})
//3.挂载vue 实例上
export default store