//Login和register共用小仓库 
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from "@/api/index";
import { setToken, getToken } from "@/utils/token";

const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //这里是本来应该后台发在手机上，这里什么都不用继续做，但是这里返回回来了
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //注册业务
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed1'))
        }
    },
    //登录业务 token令牌
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code === 200) {
            //经常通过token找服务器要用户信息
            commit("USERLOGIN", result.data.token)
            //持久化存储token 本来就是字符串不用转换
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            commit("GETUSERINFO", result.data)
            console.log(result.data);
            return 'ok'
        }
        else {
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogOut();
        //因为要清除本地的token action不能操作state
        if (result.code === 200) {
            commit("CLEAR")
            return 'ok'
        } else {
            return Promise.reject(new Error("failed"))
        }
    },
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        localStorage.removeItem('TOKEN');
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