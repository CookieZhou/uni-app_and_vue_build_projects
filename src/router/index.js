import Vue from 'vue'
import Router, { RouterMount } from 'uni-simple-router'
Vue.use(Router)
import { whitelist } from './router_tabbar'

// 初始化
const router = new Router({
    debugger: true,
    h5: {
        useUniConfig: true,  // 采用在pages.json下的所有页面配置信息,默认为true
    },
    routes: ROUTES.concat([{
        path: '*',
        name: 'moddle',
        redirect: to => {
            const name = whitelist[to.path]
            if (name) {
                return {
                    name
                }
            } else {
                return {
                    name: '404'
                }
            }
        }
    }]),

    // 每次进入页面时都初始化滚轴位置
    scrollBehavior(to, from, savedPosition) {
        console.log('savedPosition----->', savedPosition)
        return {
            x: 0,
            y: 0
        }
    }
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
    console.log('全局路由前置守卫--to', to)
    // 判断是否校验路由
    if (to.meta.isNeedAuth) {
        const ticket = uni.getStorageSync("ticket")
        console.log('需要校验权限ticket------>', ticket)
        // 有状态，并且存在sessionStorage，则next，否则返回登陆页面
        if (ticket) {
            next()
        } else {
            if (to.path !== '/pages/login/index') {
                return next({
                    path: '/pages/login/index',
                    NAVTYPE: 'push'
                })
            }
            next()
        }
    } else {
        next()
    }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log(to, from, 'afterEach----守卫')
})

export {
    RouterMount
}
