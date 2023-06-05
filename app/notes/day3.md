1:重写push与replace方法
工作的时候想处理掉，不想处理对于你的程序没有任何影响
function push(){
    return new Promise(resolve,reject){

    }
}


2:axios二次封装
-----API：关于请求相关的（axios）
请求、响应拦截器----nprogress进度条


3:vuex
当项目比较大，组件通信数据比较复杂，这种情况在使用vuex

Vuex是插件，通过vuex仓库进行存储项目的数据



1)vuex模块式开发【modules】
由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。
Vuex核心概念:state、actions、mutations、getters、modules

{
    state：{
         a:1,
         b:2,
         c:[],
         d:{}
    }
}

//模块式开发
{
    state:{
        home:{a:1},
        search:{},
        detail:{}
    }
}


2)商品分类三级联动展示动态数据

以前基础课程的时候，发请求操作如下：在组件的mounted中书写axios.get||post,获取到数据存储到组件的data当中进行使用


你们写项目的时候发请求在哪里发呀？
mounted|created:都可以

mounted：模板已经变为真是DOM【只不过没有数据，显示空白】，因为ajax是异步，需要时间的。
created：稍微好那么一丢丢（不算啥）




3)商品分类数据猜想？

[
    {
        id:1,categoryName:'图书',
        child:[
             {id:3.14,
              categoryName:'影像'，
              child:[
                   {id:4,categoryName:'华为'}
              ]
             }
        ]
    }
]


4)完成动态展示商品分类的数据






5)完成一级分类的背景效果
第一种解决方案：CSS  hover 怎么接单怎么来
第二种：用Js来
问题：:class="{cur:currentIndex==index}的冒号
data的写法;
事件委派：把子元素的事件委派给父亲



6)完成动态展示2|3联动结构
开始是通过css的display来控制
、、、、、v-show="",引号里的是当作js表达式码







7)演示卡顿现象







8)函数防抖与节流*******面试题

正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有大量业务，那么很可能出现浏览器卡顿）

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

今晚需要把防抖与节流的原理，通过JS实现【闭包 + 延迟器】

、、、、、如何手写防抖节流
、、、、防抖见图片：利用定时器，debounce
、、、、节流见图片、throttle 注意let timer = null
闭包：函数和函数所能访问的变量，他们俩被包在一个立即执行函数里，记得return里面的函数，为了能让别人使用，目的是隐藏变量





9)优化项目。
v-if|v-show
按需加载
、、、、函数防抖与节流
按需加载:对于loadsh插件，它里面封装的函数功能很多
import _ from lodash 相当于把全部功能引入进来，但是我们只是需要节流。





10)路由的跳转与传参
三级分类可以点击 会从Home跳转到search，以及显示产品名字和id，在路由跳转时传递

第一种声明式导航router-link:为什么使用router-link组件的时候，会出现卡顿那？
、、、router-link是一个组件：相当于VueComponent类的实例对象，一瞬间
、、、new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。






第二种编程式导航:push|replace

三级分类由于使用router-link的时候，会出现卡顿现象，因此采用编程式导航。

路由跳转的时候【home->search】：需要进行路由传递参数【分类的名字、一、二、三级分类的id】

、、、利用事件委派，绑定点击事件在父元素身上；可以给动态添加的元素附加效果，同时也可以提高性能
、、、、利用自定义事件确定点击的是谁以及传递数据：
、、、data-xxx就是自定义事件，.dataset显示事件的自定义属性;
、、、加了v-bind后是否按照js解析式 下次写出疑惑的语句 答案是是的

、、、复习一下路由跳转以及传参
this.$router.push()

{ 
 name:'search',
 query:{
    categoryName:'电子书',
    category2Id:4
 }
}

、、、、解决跨域问题：jsonp（只能get请求）,cors（后端为主）、配置代理服务器:nginx(后端)、借助vue-cli 修改配置文件






































