import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    // aplica o preset oficial do @eslint/js
    files: ['**/*.{js,mjs,cjs}'],
    ...js.configs.recommended,

    // sobrescreve/ajusta opções e regras do preset
    languageOptions: {
      ...js.configs.recommended.languageOptions,
      globals: globals.node,
      sourceType: 'commonjs',
    },
    rules: {
      ...js.configs.recommended.rules,
      semi: ['error', 'always'],                 // força ponto e vírgula
      quotes: ['error', 'single'],               // opcional
      'no-console': 'off',                       // opcional
      'no-unused-vars': ['error', { argsIgnorePattern: '^(?:_|next)' }],
    },
  },
]);
