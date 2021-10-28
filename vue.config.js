module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            nodeModulesPath: [
                '../../node_modules',
                '../node_modules',
                './node_modules',
            ],
            // preload: {
            //     preload: 'public/preload.js',
            // },
        },
    },
    devServer: {
        host: '127.0.0.1',
        port: 4574,
    },
}