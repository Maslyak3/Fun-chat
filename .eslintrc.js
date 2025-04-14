export default {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'unicorn'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:unicorn/recommended',
    ],
    rules: {
      'unicorn/no-inline-comments': 'off',
    },
  };