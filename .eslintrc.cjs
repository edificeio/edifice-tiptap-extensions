module.exports = {
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
  },
  ignorePatterns: ['.eslintrc.cjs', 'prettier.config.cjs', 'dist'],
};
