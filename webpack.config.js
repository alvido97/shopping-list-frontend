const webpack = require('webpack');

module.exports = {
    resolve: {
        fallback: {
            assert: require.resolve('assert/'),
            http: require.resolve('http-browserify'),
            https: require.resolve('https-browserify'),
            url: require.resolve('url/'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
}