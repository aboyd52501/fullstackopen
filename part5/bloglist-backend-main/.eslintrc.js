module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
  },
};
