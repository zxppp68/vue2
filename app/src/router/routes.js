//引入组件
//引入路由组件
// import Home from '../pages/Home'
// import Login from '../pages/Login'
// import Register from '../pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//路由懒加载
// const foo = ()=>{
//     return import('@/pages/Home')
// }
//这个时候可以注释掉上面的引入HOME路由组件，把下面的component换成foo
//也可以利用箭头函数简化

//把路由配置信息挪到这里来了
export default [
    {
        path: "/home",
        //是切换路由组件时网址里面显示的路径,大小写好像不敏感
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: "/login",
        component: () => import('@/pages/Login'),
        meta: { show: false }

    },
    {
        path: "/register",
        component: () => import('@/pages/Register'),
        meta: { show: false },
        // 5: 路由组件能不能传递props数据?
        //可以，三种写法
        //对象写法
        // props: { a: 1, b: 2 },
        //函数写法
        // props: ($route) => {
        //     return { keyword: $route.params.keyword, k: $route.query.k }
        // }

    },
    {
        path: "/search/:keyword?",
        component: Search,
        meta: { show: true },
        name: "search"

    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: { show: true }

    },
    {
        path: "/addcartsuccesss",
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta: { show: true }

    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: { show: true }

    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只能从shopcart去交易页
            if (from.path == '/shopcart' || from.path == '/') {
                next()
            } else {
                //中断当前导航 重置到from对应的地址
                next(false)
            }
        }

    },
    {
        path: "/pay",
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只能从trade去支付页 加的条件是防止刷新丢掉
            if (from.path == '/trade' || from.path == '/') {
                next()
            } else {
                //中断当前导航 重置到from对应的地址
                next(false)
            }
        }

    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
        //可以用独享守卫写进入paysuccess的逻辑，但是练习组件内守卫
    },
    {
        path: "/center",
        component: Center,
        meta: { show: true },
        //二级路由组件
        children: [{
            //要么不带反斜杠要么写全
            path: 'myorder',
            component: MyOrder
        },
        {
            path: 'grouporder',
            component: GroupOrder
        },
        {
            //进行重定向，展示默认的数据
            path: '/center',
            redirect: '/center/myorder'
        }
        ]
    },
    //重定向 当项目跑起来的时候立刻定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]