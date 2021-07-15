module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    'no-trailing-spaces': 'warn',
    'semi': 'warn',
    'quotes': 'off',
    'object-curly-spacing': 'warn',
    'brace-style': 'off',
    'camelcase': 'off',
    'space-before-function-paren': 'off',
    'indent': 'off',
    'prefer-const': 'warn',
    'keyword-spacing': 'warn',
    'eol-last': 'off',
    'spaced-comment': 'off',
    'comma-dangle': 'off',

  }
}
