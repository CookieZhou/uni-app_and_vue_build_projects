export default {
    homeData: { // 首页信息
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    },
    otherData: { // 其他数据
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    }
}
