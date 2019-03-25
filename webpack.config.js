const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
const extractCSS = new ExtractTextPlugin({
    filename: '[name].css',
    disable: process.env.WEBPACK_ENV === "dev",
    // ignoreOrder: true
});
const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.WEBPACK_ENV === "dev",
    // ignoreOrder: true
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
        filename: "[name].js",
        chunkFilename: '[name].chunk.js',
        // publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins: [
                            //static函数转换
                            '@babel/plugin-proposal-class-properties',
                            //异步加载
                            '@babel/plugin-syntax-dynamic-import',
                            //处理promise asnyc等等
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-function-bind',
                            //解构赋值
                            '@babel/plugin-syntax-object-rest-spread',
                            ['import',{
                                "libraryName": "antd",
                                "libraryDirectory": "lib",
                                "style": true
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
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
                        {loader : 'less-loader' , options : { relativeUrls : true , javascriptEnabled: true}}
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
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html')
        }),
        ()=>{
            console.log(WEBPACK_ENV);
            if(WEBPACK_ENV === 'dev') {
                new webpack.HotModuleReplacementPlugin();
                new webpack.NoEmitOnErrorsPlugin()
            }
        }
    ]
}