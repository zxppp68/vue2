import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装临时游客身份呢的模块 生成一次随机字符串
import { getUUID } from "@/utils/uuid_token";
//detail模块小仓库
const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
};

const actions = {
    //通过api里面的接口函数调用，向服务器发送请求获取数据
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code === 200) {
            commit("GETGOODINFO", result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //服务器写入数据成功，并不需要再返回其他数据，只需要返回code：200,因此没必要三连环
        //会返回一个Promise
        if (result.code === 200) {
            return "ok"
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error('failed'))
        }
    },
};

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },

};

const getters = {
    categoryView(state) {
        //至少会是一个空对象，防止报错
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        //至少会是一个空对象，防止报错
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖信息的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};

//对外暴露一个store类实例
export default {
    state,
    mutations,
    actions,
    getters
};