const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
const extractCSS = new ExtractTextPlugin({
    filename: 'stylesheets/[name].css',
    disable: process.env.WEBPACK_ENV === "dev",
    ignoreOrder: true
});
const extractLess = new ExtractTextPlugin({
    filename: "stylesheets/[name].css",
    disable: process.env.WEBPACK_ENV === "dev",
    ignoreOrder: true
});
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, './root.jsx'),
    devtool: 'inline-source-map',
    devServer: {
        port: 8086
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js",
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['latest','react'],
                        plugins: [
                            'syntax-dynamic-import'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      name: 'img/[name].[ext]'
                    }
                  }
                ]
            },
            {
                test: /\.(css|less)$/,
                use: extractLess.extract({
                    fallback : 'style-loader',
                    use: [
                        {loader : 'css-loader' , options : { importLoaders: 2 , autoprefixer : false}},
                        {loader: 'postcss-loader'},
                        {loader : 'less-loader' , options : { relativeUrls : true}}
                    ]

                })
            }, {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },{
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[md5:hash:hex:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        extractLess,
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'view/index.html',
            template: path.resolve(__dirname, './index.html')
        }),
        ()=>{
            console.log(WEBPACK_ENV);
            if(WEBPACK_ENV === 'dev') new webpack.HotModuleReplacementPlugin()
        }
    ]
}