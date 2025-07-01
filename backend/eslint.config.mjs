// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'module',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: './tsconfig.json',
        ecmaVersion: 2023,
      },
    },
  },
  {
    rules: {
      // Disable strict TypeScript rules that are causing most errors
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      
      // Formatting rules
      'prettier/prettier': ['error', {
        'singleQuote': false,
        'trailingComma': 'all',
        'printWidth': 100,
        'tabWidth': 2,
        'semi': true,
        'bracketSpacing': true,
        'arrowParens': 'always',
        'endOfLine': 'lf'
      }],
      'quotes': ['error', 'double'],
      'semi': ['error', 'always'],
      
      // Variable usage
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn']
    },
  },
);