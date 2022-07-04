// import{
//     ADD_COUNTER,
//     ADD_TO_CART
// }from './mutation-type'

export default{
     //mutations唯一目的是修改state的状态
        //mutations中的每一个方法尽可能完成的事件比较单一一点
        //所以计算性方法应该在actions中执行
        /* [ADD_COUNTER] */addCounter(state,payload){
            payload.count++
        },
        //将函数名抽取为常量从mutation-type导入
        /* [ADD_TO_CART] */addToCart(state,payload){
            payload.checked=true
            state.cartList.push(payload)
        }
}