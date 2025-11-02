import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: ['error', 'always'], // ← força ponto e vírgula obrigatório
      quotes: ['error', 'single'], // opcional: força aspas simples
      'no-console': 'off',        // opcional: permite console.log()
      // IGNORA parâmetros não usados que se chamem "next
      'no-unused-vars': ['error', { argsIgnorePattern: 'next' }]
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
]);
