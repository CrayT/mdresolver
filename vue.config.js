module.exports = {
    devServer: {
        port: 1111
    },
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('html-loader')
            .loader('html-loader')
            .end()
            .use('markdown-loader')
            .loader('markdown-loader')
            .end()
    }
}