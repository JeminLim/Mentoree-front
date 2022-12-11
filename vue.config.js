module.exports= {
    outputDir: '../src/main/resources/static',
    devServer: {
        port: 80,
        disableHostCheck: true,
        proxy: {
            '/member-service': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            },
            '/member-auth-service': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            },
            '/mentoring-service': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            },
            '/reply-service': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            },
            '/docs': {
                target: process.env.VUE_APP_BACKEND_URL,
                changeOrigin: true
            }
        }
    }
}