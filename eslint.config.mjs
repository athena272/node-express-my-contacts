import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node, sourceType: 'commonjs' },
    rules: {
      semi: ['error', 'always'],              // força ponto e vírgula
      quotes: ['error', 'single'],            // (opcional) aspas simples
      'no-console': 'off',                    // (opcional) permite console
      // IGNORA parâmetros não usados que se chamem "next" ou comecem com "_"
      'no-unused-vars': ['error', { argsIgnorePattern: '^(?:_|next)' }],
    },
  },
]);
