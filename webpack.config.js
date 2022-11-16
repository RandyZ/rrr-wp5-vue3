const path = require('path');
// 配置模板（HtmlWebpackPlugin）
const HtmlWebpackPlugin = require('html-webpack-plugin');
// CSS打包分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// CSS压缩
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// 编译速度分析
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const smp = new SpeedMeasurePlugin();
// smp.wrap()
// 代码压缩
const TerserPlugin = require('terser-webpack-plugin');
// Vue
const { VueLoaderPlugin } = require('vue-loader');
// -----------------------------------------------可选项-------------------------------------------------
// -----------------------------------------------参数变量-------------------------------------------------
const DevMode = process.env.NODE_ENV !== 'production';
console.info('Randy ENV', process.env.NODE_ENV, 'mode', DevMode);
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
        extensions: ['*', '.js', '.ts', '.vue', '.json'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    // 优化编译
    optimization: {
        runtimeChunk: true,
        moduleIds: 'deterministic',
        minimizer: [
            new TerserPlugin({
                parallel: 4, //核心数量
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
        // 分Chunk抽离重复代码
        splitChunks: {
            // include all types of chunks
            chunks: 'all',
            // 重复打包问题
            cacheGroups: {
                vendors: {
                    // node_modules里的代码
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    // name: 'vendors', 一定不要定义固定的name
                    priority: 10, // 优先级
                    enforce: true,
                },
            },
        },
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
                test: /\.css$/i,
                use: [
                    DevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    // 多进程编译
                    {
                        loader: 'thread-loader',
                        options: { workerParallelJobs: 2 },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    DevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        },
                    },
                    
                ],
            },
            // Vue编译
            {
                test: /.vue$/,
                use: ['vue-loader'],
            },
            // 1. ts编译支持；2. js兼容支持
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                ],
            },
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
        new VueLoaderPlugin(),
    ],
};
