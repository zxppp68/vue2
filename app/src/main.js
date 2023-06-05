import Vue from 'vue'
import { Carousel, CarouselItem, Button, MessageBox } from "element-ui";
import App from './App.vue'
//三级联动组件--注册为全局组件
import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination';
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from './router'
//引入仓库
import store from './store'
//引入element ui 完成轮播图

//引入mock虚拟数据
import '@/mock/mockServe'
import "swiper/css/swiper.css"
//统一引入API文件夹里的全部请求函数
import * as API from '@/api'

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
// Vue.use(Carousel)
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Button.name, Button)
//饿了么ui注册时还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入插件
import VueLazyload from 'vue-lazyload';
//引入默认图片 图片json css都是默认暴露的
import atm from '@/assets/logo.png'
// 注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: atm
})
//引入表单验证插件 不需要对外暴露 执行即可
import "@/plugins/validate"

new Vue({
  render: h => h(App),
  //全局事件总线的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    //挂载在原型上 所有组件都可以拿去用 只需要引一次 组件里不需要再引入了 工作时如果没有vuex基本都这么写
    Vue.prototype.$API = API
  },
  //注册路由,kv一致省略v
  //注册路由信息，组件身上都会拥有$route,$router属性
  router,
  store
}).$mount('#app')
