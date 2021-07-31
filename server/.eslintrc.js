module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/no-explicit-any": 'off',
        "@typescript-eslint/no-inferrable-types": 'off',
        "@typescript-eslint/explicit-module-boundary-types": 'warn',
        "@typescript-eslint/no-unused-vars": 'warn',
        "@typescript-eslint/prefer-namespace-keyword": 'off',
        "@typescript-eslint/no-namespace": 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-this-alias': 'off',
        "prefer-const": 'warn',
        "no-empty": 'off',
        "no-inner-declarations": 'off',
        "no-prototype-builtins": 'off',
        "no-func-assign": 'off',
        "no-undef": 'off',
    }
};
