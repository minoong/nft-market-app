module.exports = {
 env: {
  browser: true,
  es2021: true,
  jest: true,
 },
 extends: ['plugin:react/recommended', 'airbnb', 'plugin:react/jsx-runtime', 'plugin:prettier/recommended'],
 parser: '@typescript-eslint/parser',
 parserOptions: {
  ecmaFeatures: {
   jsx: true,
  },
  ecmaVersion: 'latest',
  sourceType: 'module',
 },
 plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
 rules: {
  'import/no-extraneous-dependencies': 'off',
  'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
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
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
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
