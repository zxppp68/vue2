//所有的api接口统一管理
import requests from "./request";
import mockRequests from "./mockAjax";

//三级联动的接口
export const reqCategoryList = () => {
    //发请求,返回结果是promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
}

//banner接口
//获取banner轮播图数据
export const reqGetBannerList = () => {
    //发请求,返回结果是promise对象
    return mockRequests({ url: '/banner', method: 'get' })
}

//floor接口
//获取floor数据
export const reqGetFloorList = () => {
    //发请求,返回结果是promise对象
    return mockRequests({ url: '/floor', method: 'get' })
}

//获取搜索模块数据 地址:/api/list 请求方式：post  请求需要带参数
/*
{
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  }
*/

//当前函数需要传递参数 获取搜索模块参数
//当前这个接口，给服务器传递一个默认参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
    //发请求,返回结果是promise对象
    url: "/list",
    method: "post",
    data: params,
})

//获取产品详细信息接口 /api/item/{ skuId }
export const reqGoodsInfo = (skuId) => requests({
    //发请求,返回结果是promise对象
    url: `/item/${skuId}`,
    method: "get",
})

//将产品添加到购物车或者更新购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    //发请求,返回结果是promise对象
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
})

//获取购物车列表 /api/cart/cartList   get
export const reqCartList = () => requests({
    //发请求,返回结果是promise对象
    url: "/cart/cartList",
    method: "get",
})

//删除购物车 /api/cart/deleteCart/{skuId} delete
export const reqDeleteCartById = (skuId) => requests({
    //发请求,返回结果是promise对象
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
})

//切换商品勾选状态 /api/cart/checkCart/{skuId}/{isChecked} get
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    //发请求,返回结果是promise对象
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
})

//获取验证码 /api/user/passport/sendCode/{phone}  get
export const reqGetCode = (phone) => requests({
    //发请求,返回结果是promise对象
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
})

//注册成功 /api/user/passport/register POST phone code password
export const reqUserRegister = (data) => requests({
    //发请求,返回结果是promise对象
    url: "/user/passport/register",
    method: "post",
    data: data
})

//获取登录信息 /api/user/passport/login post phone password
export const reqUserLogin = (data) => requests({
    //发请求,返回结果是promise对象
    url: "/user/passport/login",
    method: "post",
    data: data
})

//获取用户信息【需要带着用户token向服务器要用户信息】
///api/user/passport/auth/getUserInfo get
export const reqUserInfo = () => requests({
    //发请求,返回结果是promise对象
    url: "/user/passport/auth/getUserInfo",
    method: "get",
})

//退出登录 /api/user/passport/logout  get
export const reqLogOut = () => requests({
    //发请求,返回结果是promise对象
    url: "/user/passport/logout",
    method: "get",
})

//获取用户地址信息 /api/user/userAddress/auth/findUserAddressList get
export const reqAddressInfo = () => requests({
    //发请求,返回结果是promise对象
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
})

//获取商品清单 /api/order/auth/trade get
export const reqOrderInfo = () => requests({
    //发请求,返回结果是promise对象
    url: "/order/auth/trade",
    method: "get",
})

//提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo} post
export const reqSubmitOrder = (tradeNo, data) => requests({
    //发请求,返回结果是promise对象
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data: data
})

//获取订单信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => requests({
    //发请求,返回结果是promise对象
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
})

//查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => requests({
    //发请求,返回结果是promise对象
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
})

//获取我的订单信息 /api/order/auth/{page}/{limit} get
export const reqMyOrderList = (page, limit) => requests({
    //发请求,返回结果是promise对象
    url: `/order/auth/${page}/${limit}`,
    method: "get",
})