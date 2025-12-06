import js from '@eslint/js'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.jest
      },
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    extends: [
      js.configs.recommended
    ],

    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      react
    },

    settings: {
      react: { version: 'detect' }
    },

    rules: {
      indent: ['error', 2],
      semi: ['error', 'never'],

      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      'import/order': ['error', {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type'
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@/**', group: 'internal' }
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true }
      }],

      'no-unused-vars': 'off', // используем TS версию
      '@typescript-eslint/no-unused-vars': ['error'],

      'no-multiple-empty-lines': ['error', {
        max: 1, maxEOF: 0, maxBOF: 0
      }],
      'padded-blocks': ['error', 'never'],

      '@typescript-eslint/no-explicit-any': 'error'
    }
  }
])
