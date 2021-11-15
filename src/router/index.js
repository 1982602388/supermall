
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const Home=()=>import('views/home/home.vue')
const cart=()=>import('views/cart/cart.vue')
const category=()=>import('views/category/category.vue')
const profile=()=>import('views/profile/profile.vue')
const Detail=()=>import('views/detail/Detail.vue')

export default new Router({
  routes: [
    {
      path:'', 
      component:Home
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/cart',
      component:cart
    },
    {
      path:'/category',
      component:category
    },
    {
      path:'/profile',
      component:profile
    },
    {
      path:'/detail/:iid',
      component:Detail
    }
  ],
  mode:'history'
})
