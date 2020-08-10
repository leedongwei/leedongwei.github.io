module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended', // This must be the last plugin
  ],
  rules: {
    // http://eslint.org/docs/rules/quotes.html
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],

    // https://eslint.org/docs/rules/semi
    semi: ['error', 'always'],

    // http://eslint.org/docs/rules/space-in-brackets.html
    'object-curly-spacing': ['error', 'never'],

    'react/jsx-boolean-value': ['error', 'always'],
    'react/jsx-curly-brace-presence': ['error', {props: 'always', children: 'always'}],
  },
};
