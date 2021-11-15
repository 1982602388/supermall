import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//vue实例为事件总线
Vue.prototype.$bus=new Vue()
//安装toast插件
Vue.use(toast)
//安装移动端点击延迟300毫秒
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/huang/huang.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
