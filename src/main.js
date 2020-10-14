import Vue from 'vue'
import App from './App'
import uView from "uview-ui"
Vue.use(uView)

// 引入封装的接口
import { httpRequest } from '../api/request'

import router from './router'
import { RouterMount } from 'uni-simple-router'

//引入vuex
import store from '../store'

Vue.prototype.$api = httpRequest

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})

// v1.3.5起 H5端 应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app, '#app')
// #endif

// #ifndef H5
	app.$mount() // 为了兼容小程序及app端必须这样写才有效果
// #endif
