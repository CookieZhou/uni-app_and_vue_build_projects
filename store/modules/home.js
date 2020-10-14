const homeMethods = {
    setUser: 'setUser',
}
const store = {
    namespaced: true,
    state: {
        name: '首页'
    },
    getters: {
        getLocale: state => {
            return state.name
        }
    },
    mutations: {
        [homeMethods.setUser]: (state, data) => {
            console.log('被执行了', data)
        }
    },
    actions: {
        demoactions: ({ commit }, data) => {
            commit(homeMethods.setUser, data)
        }
    }
}
export default store
