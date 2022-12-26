module.exports= {
    outputDir: '../src/main/resources/static',
    devServer: {
        port: 8081,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            }
        }
    }
}