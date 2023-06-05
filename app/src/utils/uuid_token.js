import { v4 as uuidv4 } from "uuid";
//生成一个随机字符串，且每次执行不发生变化，长久储存
export const getUUID = () => {
    //先从本地存储中获取uuid（看一下本地存储是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if (!uuid_token) {
        uuid_token = uuidv4()
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //切记有返回值
    return uuid_token
}