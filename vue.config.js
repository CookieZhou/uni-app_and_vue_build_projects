// uni-read-pages相关文档: https://www.npmjs.com/package/uni-read-pages
const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
    includes: ['path', 'meta', 'name']
})
module.exports = {
    transpileDependencies: ['uni-simple-router'],
    productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
    configureWebpack: {
        plugins: [
            // 借助webpack.DefinePlugin 轻松注入全局变量ROUTES，可全局使用ROUTES
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}
