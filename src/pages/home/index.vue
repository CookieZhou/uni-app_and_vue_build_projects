<template>
    <view class="home_page">
        <u-button type="primary" @click="goMy">去我的页面</u-button>
        <u-button type="success" @click="goLoginOut">退出登陆</u-button>
    </view>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            title: 'Hello'
        }
    },
    computed: {
        ...mapGetters('home', ['getLocale']),
        ...mapState('home', ['name'])
    },
    methods: {
        ...mapMutations('home', [
            'setUser'
        ]),
        ...mapActions('home', [
            'demoactions'
        ]),
        goMy(e) {
            uni.navigateTo({
                url: '/pages/my/index'
            })
        },
        goLoginOut() {
            uni.showToast({
                title: '莫激动，这个还没写',
                icon: 'none',
                mask: true
            })
        }
    },
    created() {
        console.log('this.name---created', this.name)
        console.log('this.$store.state---created', this.$store.state)
    },
    onLoad() {
        this.setUser('传递的内容')
        this.demoactions('这是一个异步')
    }
}
</script>

<style>
</style>
