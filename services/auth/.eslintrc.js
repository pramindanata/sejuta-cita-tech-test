module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  root: true,
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'warn',
  },
};
