//trade小仓库 
import { reqAddressInfo, reqOrderInfo } from "@/api/index";

const state = {
    address: [],
    orderInfo: {}
}

const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo();
        if (result.code === 200) {
            commit("GETUSERADDRESS", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo();
        if (result.code === 200) {
            commit("GETORDERINFO", result.data)
            return 'ok'
        } else {
            // return Promise.reject(new Error('failed'))
        }
    },

}

const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
};