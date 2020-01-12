const obj = {};
const p = './src/'
const fs = require('fs');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const UglyfyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


fs.readdirSync('./src', {withFileTypes: true})
                .filter(item => !item.isDirectory())
                .map(item => item.name).forEach(function(o) {
                    obj[o.split('.')[0]] = p+o;
                });

module.exports = {
    mode: 'production',
    entry: obj,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new UglyfyJsPlugin(),
        new OptimizeCssPlugin()
    ]
}