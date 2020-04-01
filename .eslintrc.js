module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [],
  plugins: ['react', 'react-hooks', 'import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/class-name-casing': 'warn',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    'import/newline-after-import': 'warn',
    'import/no-cycle': 'error',
    'import/no-default-export': 'warn',
    'import/no-extraneous-dependencies': 'error',
    'import/no-relative-parent-imports': 'warn',
    'no-var': 'warn',
    'prefer-arrow-callback': 'warn',
    'prefer-const': 'warn',
    radix: 'warn',
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'warn',
    'react/sort-comp': 'warn',
  },
};
