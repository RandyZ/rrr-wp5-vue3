const path = require('path');
// 配置模板（HtmlWebpackPlugin）
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CSS打包分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// CSS压缩
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    devtool: 'inline-source-map',
    devServer: {
        port: 9000,
        hot: true,
        open: false,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        extensions: [ '*', '.js', '.ts', '.vue', '.json']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            // 配置资源文件
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: 'asset/resource',
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext][query]',
                },
            },
            // 配置样式文件
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    'less-loader',
                    'postcss-loader',
                ],
            },
            // 配置babel
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // 支持TypeScript
            {
              test : /\.ts$/,
              use : 'ts-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            vue: 'single-spa',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        }),
        new CssMinimizerWebpackPlugin(),
    ],
};
