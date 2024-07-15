module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    'no-unused-vars': 0,
    'no-debugger': 0,
  },
}
