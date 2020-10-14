// 引入接口基础域名
import base_url_config from './base_url_config'

// 设置公共基础参数
const baseParam = {
	'Device-Id': 'packapp',
	'phone_brand': '',
	'app_version': 85,
	'app_version_name': ''
}

// 运行环境
const environment = process.env.NODE_ENV
console.log('运行环境', environment)

// 请求地址
let baseUrl = base_url_config[environment]
console.log('请求地址', baseUrl)

export const request = (config) => {
    console.log('-----config>', config)
    console.log('请求的接口：', baseUrl + config.url)
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + config.url,
            data: Object.assign(config.data, baseParam),
            timeout: 10000,
			sslVerify: false,
			header:{
				'Content-Type': 'application/json',
				...config.header
            },
            method: config.type,
            success: (res) => {
				const data = res.data
				httpCodeHandle(data, resolve, reject)
            },
            fail: (err) => {
                console.log('接口调用失败', JSON.stringify(err))
                uni.showToast({
					title: '请求失败' + JSON.stringify(err),
					position: 'bottom',
					icon: 'none',
					duration: 2000
				})
				reject(err)
            }
        })
    })
}

// http状态码处理（根据自己需要进行相应修改）
function httpCodeHandle(data, resolve, reject) {
    switch(data.errorCode){
		case 0: // 成功
			resolve(data)
			break
		case 20130001: // 账号不存在
			uni.reLaunch({
			    url: 'pages/login/index'
			})
			break
		case 20130002: // 密码错误
			uni.reLaunch({
			    url: 'pages/login/index'
			})
			break
		default:
            uni.showToast({
                title: data.errorMsg,
				position: 'bottom',
				icon: 'none',
				duration: 2000
			})
            reject(data)
			break
	}
}
