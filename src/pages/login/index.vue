<template>
	<view class="login_wrap">
		<view class="login_logo">
			<u-image width="100%" height="100%" shape="circle" :src="src"></u-image>	
		</view>
		<u-form :model="form" ref="uForm">
			<u-form-item label="账号" prop="account">
				<u-input
					v-model="form.account"
					maxlength="20"
					placeholder="请输入您的店员账号"/>
			</u-form-item>
			<u-form-item label="密码" prop="passwd">
				<u-input
					type="password"
					v-model="form.passwd"
					maxlength="20"
					placeholder="请输入您的店员密码"/>
			</u-form-item>
		</u-form>
			<view class="remerber_pwd">
				<checkbox-group @change="checkChange">
					<label v-for="item in items" :key="item.value">
						<checkbox
							class="rember"
							size="28rpx"
							:value="item.value"
							:checked="item.isRemberPwd"
							color="#2ecc71"
							active-color="#2ecc71"
							:disabled="false"
							style="transform:scale(0.55)" />记住密码
					</label>
				</checkbox-group>
			</view>
		<view class="foot">
			<button
				class="login_btn"
				ripple
				ripple-bg-color="#33e67e"
				@tap="submit"
				type="primary">登录</button>
		</view>
	</view>
</template>

<script>
import { checkAccount, checkPwd } from '../../../utils/login_check.js'
export default {
	data() {
		return {
			src: require('../../static/logo.png'),
			form: {
				account: '',
				passwd: ''
			},
			items: [
				{
					isRemberPwd: true,
					value: '1'
				}
			],
			isRemberPwd: 1  // 1|记住密码，0|不记住密码
		}
	},
	methods: {
		checkChange(e) {
			if(e.detail.value.length > 0) {
				this.isRemberPwd = 1
			} else {
				this.isRemberPwd = 0
			}
			// console.log('this.isRemberPwd', this.isRemberPwd)
		},
		// 登录
		submit() {
			if (!checkAccount(this.form.account) || !checkPwd(this.form.passwd)) {
				return
			}
			// 以上校验通过
            const that = this
			this.$api('userLogin', { ...that.form, ...that.$store.state.user.phoneData }).then(res => {
				console.log('res=======>登录结果', res)
				uni.showToast({
					title: '登录成功',
					position: 'bottom',
					icon: 'none',
					duration: 2000
				})
				const storageKey = that.form.account
				// 将登录后获取到的用户数据缓存在本地
                uni.setStorageSync(storageKey, JSON.stringify(res.result))
                uni.setStorageSync('ticket', res.result.ticket)
				// 记住账号密码
				that.remberPwd()
				// 页面跳转
				that.redirectPage()
			})
		},
		// 页面跳转
		redirectPage() {
            const that = this
			this.$Router.replaceAll({
				path: '/pages/home/index',
				query: {
					'account': that.form.account
				}
			})
			// uni.showLoading({
			// 	title: '正在登录'
			// })
			// uni.hideLoading()
			// uni.hideToast()
			// this.$Router.replaceAll({
			// 	path: 'pages/redirect/index',
			// 	query: {
			// 		'account': that.form.account
			// 	}
			// })
		},
		// 记住账号密码
		remberPwd() {
			const that = this
			console.log('是否需要记住密码', that.isRemberPwd)
			uni.setStorageSync('isRemberPwd', this.isRemberPwd)
			if (this.isRemberPwd > 0) {
				uni.setStorage({
					key: 'account',
					data: that.form.account,
					success: (res) => {
						console.log('已缓存账号', res)
					}
				})
				uni.setStorage({
					key: 'account_' + that.form.account,
					data: that.form.passwd,
					success: (res) => {
						console.log('已缓存密码', res)
					}
				})
			}
		},
		// 检查是否已记住过密码
		checkIsRembered() {
			if (uni.getStorageSync('isRemberPwd')) {				
				this.isRemberPwd = uni.getStorageSync('isRemberPwd')
				if (this.isRemberPwd > 0) {
					this.getLocalPwd()
				}
			}
		},
		// 获取缓存的账号密码
		getLocalPwd() {
			const that = this
			uni.getStorage({
				key: 'account',
				success: (res) => {
					console.log('账号', res)
					that.form.account = res.data
					// 查看是否有已登录获取到的信息
					that.checkIsLogin()
					// 获取缓存的密码
					uni.getStorage({
						key: 'account_' + that.form.account,
						success: (res) => {
							console.log('密码', res)
							that.form.passwd = res.data
						}
					})
				}
			})
		},
		// 查看是否有已登录获取到的信息
		checkIsLogin() {
			const storageKey = this.form.account
			console.log('account------storageKey', storageKey)
			// 将登录后获取到的用户数据缓存在本地
			const userData = uni.getStorageSync(storageKey)
			console.log('缓存中获取的userData----->', userData)
			// 如果有userData代表已经登陆过-->页面跳转
			if (userData) {
				this.redirectPage()
			}
		},
		// 网络状态检测
		checkNet() {
			uni.getNetworkType({
			    success: function (res) {
			        console.log('网络状态-------->', res)
					if (res.networkType === 'none') {
						uni.showModal({
							title: '网络异常',
							showCancel: false,
							content: '您当前网络不正常，请检查是否连网'
						})
					}
			    }
			})
		}
	},
	created() {
		const that = this
		// 检查是否已记住过密码
		this.checkIsRembered()
		// 网络状态检测
		this.checkNet()
	}
}
</script>
<style lang="scss" src="./index.scss" scoped></style>