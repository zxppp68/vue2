//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
import { toPath } from "lodash";

//使用插件
Vue.use(VueRouter);

// //引入路由组件 挪走拉
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'


//配置路由
let router = new VueRouter({
    //配置路由 (k-v一致省略v)
    routes,
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { y: 0 }
    }
})

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    let name = store.state.user.userInfo.name
    // to是跳转到哪个路由  from是从哪个路由来 next放行函数 next()放行  next(path)指定放行 next(false)回到from的路由
    if (store.state.user.token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (name) {
                //登陆后且有用户信息
                next()
            } else {
                try {
                    //登陆后没有用户信息，必须先派发action再跳转
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //token失效 获取不到用户信息
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {

        //未登录情况 访问交易页面（trade\pay\paysuccess) 用户中心(center) 都要跳转去登陆界面
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            //把未登录时想去的信息存在地址栏中的query参数
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})


export default router;