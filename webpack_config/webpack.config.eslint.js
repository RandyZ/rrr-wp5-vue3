const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    plugins: [
        new ESLintPlugin({
            fix: true /* 自动帮助修复 */,
            extensions: ['js', 'json', 'coffee', 'vue'],
            exclude: 'node_modules',
        }),
    ],
};
