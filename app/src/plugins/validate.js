//插件对外暴露一定是一个对象 且必须有install方法
//validate插件 表单验证区域
import Vue from "vue"
import VeeValidate from "vee-validate"
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

//表单验证
VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
    },
    attributes: { // 给校验的 field 属性名映射中文名称
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isCheck: '协议',
        agree: '同意协议'
    }
});

//自定义校验规则
VeeValidate.Validator.extend('agree', {
    validate: value => {
        return value
    },
    getMessage: field => field + '必须同意'
})