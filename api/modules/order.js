export default {
    getOrder: { // 订单列表
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    },
    orderDetail: { // 订单详情
        url: 'Storestaff&a=login',
        type: 'post', // 默认post，可忽略不写
        header: {
            'Content-Type': 'application/json', // 可省略默认
            isIgnore: false // 是否过滤拦截，默认false
        }
    }
}
