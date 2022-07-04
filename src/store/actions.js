
export default{
     //在detail的提交也改成this.$store.dispatch('addCart',product)
     addCart(context,payload){
       return new Promise((resolve/* ,reject */)=>{
        let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
        if(oldProduct){
            // oldProduct.count+=1
            context.commit('addCounter',oldProduct)
            resolve('当前的商品数量+1')
        }
        else{
            //因为让mutations的执行单一，所以提取state.cartList.push(payload)
            payload.count=1
            context.commit('addToCart',payload)
            resolve('添加新商品')
        }
       })
    }
}