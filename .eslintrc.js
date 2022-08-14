module.exports = {
 env: {
  browser: true,
  es2021: true,
  jest: true,
 },
 extends: [
  'airbnb',
  //   'airbnb-typescript',
  'airbnb/hooks',
  'eslint:recommended',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
  //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
  'plugin:react/recommended',
  'plugin:react/jsx-runtime',
  'plugin:prettier/recommended',
  //   'prettier/@typescript-eslint',
  'plugin:cypress/recommended',
  'plugin:storybook/recommended',
 ],
 parser: '@typescript-eslint/parser',
 parserOptions: {
  ecmaFeatures: {
   jsx: true,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
 },
 plugins: ['simple-import-sort'],
 rules: {
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error'],
  'import/no-extraneous-dependencies': 'off',
  'react/jsx-filename-extension': [
   'error',
   {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
   },
  ],
  'import/extensions': [
   'error',
   'ignorePackages',
   {
    js: 'never',
    jsx: 'never',
    ts: 'never',
    tsx: 'never',
    json: 'never',
    'd.ts': 'never',
   },
  ],
  'no-shadow': 'off',
  'simple-import-sort/imports': [
   'error',
   {
    groups: [
     // Packages `react` related packages come first.
     ['^react', '^@?\\w'], // Internal packages.
     //  ['^(@|components)(/.*|$)'],
     // Side effect imports.
     ['^\\u0000'], // Parent imports. Put `..` last.
     ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Other relative imports. Put same-folder imports and `.` last.
     ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Style imports.
     ['^.+\\.?(css)$'],
    ],
   },
  ],
  'simple-import-sort/exports': 'error',
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
  'import/prefer-default-export': 'off',
  'class-methods-use-this': 'off',
  'react/function-component-definition': 'off',
  'react/jsx-props-no-spreading': 'off',
 },
 settings: {
  react: {
   version: 'detect',
  },
  'import/parsers': {
   '@typescript-eslint/parser': ['.ts', '.tsx'],
  },
  'import/resolver': {
   node: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', 'd.ts'],
   },
   typescript: './tsconfig.json',
  },
 },
}
