//对于axios进行二次封装
import axios from "axios";
//引入store
import store from "@/store";
//引入进度条
import nprogress from "nprogress";
//start done方法代表进度条开始结束
//引入进度条样式
import "nprogress/nprogress.css"

let requests = axios.create(
    {
        //配置对象
        //基础路径
        baseURL: "/api",
        timeout: 5000,
    }
)

//请求拦截器 在项目中发请求，（请求没有发出去）可以做一些事情
requests.interceptors.request.use((config) => {
    //config是配置对象 里面有请求头
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段（userTempId)和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要token传给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //让进度条开始动
    nprogress.start()
    return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    //成功的回调函数
    return res.data
}, (err) => {
    //响应失败的回调函数
    return Promise.reject(new Error('failed'))
})

export default requests;