import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['**/node_modules/', '**/dist/', '**/build/', 'server/temp/'],
  },
  {
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
    },
  },
];
