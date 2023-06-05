import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
//detail模块小仓库
const state = {
    cartList: []
};

const actions = {
    //通过api里面的接口函数调用，向服务器发送请求获取数据
    async getCartList({ commit }) {
        let result = await reqCartList();
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code === 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //修改选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code === 200) {
            return 'OK'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },

    deleteAllCheckedCart({ dispatch, getters }) {
        //以前都是commit其实都可以用 context:小仓库 commit：提交mutations修改state getters  dispatch:派发action state
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },

    //修改全部选中状态 updataAllCartIsChecked
    updataAllCartIsChecked({ dispatch, state }, isChecked) {
        //以前都是commit其实都可以用 context:小仓库 commit：提交mutations修改state getters  dispatch:派发action state
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    },

};

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
};

//对外暴露一个store类实例
export default {
    state,
    mutations,
    actions,
    getters
};