//search模块小仓库
import { reqGetSearchInfo } from "@/api";


const state = {
    searchList: {},
};

const actions = {
    //获取Search模块的数据  params形参在dispatch时第二个参数派发,默认参数空对象
    async getSearchList({ commit }, params = {}) {
        //reqGE****需要传一个空对象
        let result = await reqGetSearchInfo(params);
        if (result.code === 200) {
            commit("GETSEARCHLIST", result.data)
        }
    },
};

const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    },
};
//计算属性,为了简化仓库里面的数据而生
//把将来组件中所需要用到的数据简化一下
const getters = {
    //传入的形参是当前仓库的state
    goodsList(state) {
        //要考虑到初始的时候是空对象
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },

};

//对外暴露一个store类实例
export default {
    state,
    mutations,
    actions,
    getters
};