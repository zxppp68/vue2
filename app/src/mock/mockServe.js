//引入mockjs模块
import Mock from 'mockjs'

//引入json文件
import banner from './banner.json'
import floor from './floor.json'

//第一个参数是请求地址，第二个是请求数据
Mock.mock("/mock/banner", { code: 200, data: banner })
Mock.mock("/mock/floor", { code: 200, data: floor })