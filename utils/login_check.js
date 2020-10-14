// 只允许输入数字或字母
const reg = /^[0-9a-zA-Z]*$/

// 登录账号校验
export const checkAccount = (str) => {
	if (!str) {
		uni.showToast({
			title: "请输入您的店员账号",
			position: 'bottom',
			icon: 'none',
			duration: 2000
		})
		return false
	} else {
		if (reg.test(str)) {
			return true
		} else {
			uni.showToast({
				title: "请输入由1~20位数字或字母组成的账号",
				position: 'bottom',
				icon: 'none',
				duration: 2000
			})
			return false
		}
	}
}

// 登陆密码校验
export const checkPwd = (str) => {
	if (!str) {
		uni.showToast({
			title: "请输入您的店员密码",
			position: 'bottom',
			icon: 'none',
			duration: 2000
		})
		return false
	} else {
		if (reg.test(str)) {
			return true
		} else {
			uni.showToast({
				title: "请输入由1~20位数字或字母组成的密码",
				position: 'bottom',
				icon: 'none',
				duration: 2000
			})
			return false
		}
	}
}
