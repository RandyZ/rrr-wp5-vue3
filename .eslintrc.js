module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:vue/essential', 'standard'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    /**
     * "off" 或 0 - 关闭规则
     * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
     * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
     */
    // 关闭对所有未定义变量的警告提示
    'no-undef': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',
    // 对于requires引入 关闭
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-console': 'off', // console.log()语法报错 关闭
    indent: 'off',
    semi: [2, 'never'], // 要求或禁止使用分号代替 ASI,即禁用行尾使用分号
    quotes: [2, 'single'], // 使用单引号
    'no-mixed-spaces-and-tabs': [2], // 禁止空格和 tab 的混合缩进
    'no-extra-semi': [2], // 禁止不必要的分号
    'comma-dangle': ['error', 'only-multiline'], // 禁止末尾逗号
    'no-dupe-args': 2, // 方法的参数中不允许有重复值。
    'no-dupe-keys': 2, // 定义对象时不允许有重复的键
    'no-duplicate-case': 2, // switch语句中不允许使用相同的case值
    'no-empty': 2, // 不允许空的块语句
    'no-func-assign': 2, // 不允许为一个函数赋值。
    'prettier/prettier': 'off',
    'space-before-function-paren': 'off',
  },
}
