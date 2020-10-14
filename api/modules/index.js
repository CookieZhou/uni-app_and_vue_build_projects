const files = require.context('.', false, /\.js$/)

let modules = {}

files.keys().forEach(key => {
    if (key === './index.js') return
    const item = files(key).default
    for(const i in item) {
        modules[i] = item[i]
    }
})

export default modules
