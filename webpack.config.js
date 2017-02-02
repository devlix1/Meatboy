const webpack = require('webpack');

module.exports = {
    entry: './public/Vue/main.js',
    output: {
        filename: './public/assets/js/build.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};