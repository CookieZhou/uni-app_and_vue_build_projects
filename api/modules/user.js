export default {
    userLogin: { // 用户登录
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    },
    loginOut: { // 用户退出
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    }
}
