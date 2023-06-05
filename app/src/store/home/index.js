import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api";
//home模块小仓库
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
};

const actions = {
    //通过api里面的接口函数调用，向服务器发送请求获取数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取banner首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    //获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code === 200) {
            commit("GETFLOORLIST", result.data)
        }
    },
};

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};

const getters = {

};

//对外暴露一个store类实例
export default {
    state,
    mutations,
    actions,
    getters
};