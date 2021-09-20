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
    'semi': 'off',
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
    'no-multiple-empty-lines': 'warn',
    "object-curly-newline": 'off',
    "padded-blocks": 'off',
    "no-inner-declarations": 'off',
    "no-prototype-builtins": 'warn',
    'no-multiple-empty-lines': 'off',
    'space-before-blocks': 'warn',
    "@typescript-eslint/prefer-namespace-keyword": 'off',
    "@typescript-eslint/no-namespace": 'warn',
    "@typescript-eslint/ban-types": 'warn',    
    "@typescript-eslint/no-inferrable-types": 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    

  }
}
