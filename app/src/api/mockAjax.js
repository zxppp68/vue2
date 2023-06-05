//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//start done方法代表进度条开始结束
//引入进度条样式
import "nprogress/nprogress.css"

let requests = axios.create(
    {
        //配置对象
        //基础路径
        baseURL: "/mock",
        timeout: 5000,
    }
)

//请求拦截器
requests.interceptors.request.use((config) => {
    //config是配置对象 里面有请求头
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