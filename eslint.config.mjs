import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // base JS recommended rules
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // 🔥 best practice
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      curly: 'error',

      // 🧠 code quality
      'no-var': 'error',
      'prefer-const': 'error',
      'no-undef': 'error',

      // optional strictness
      'no-empty': 'warn',
    },
  },
]);
