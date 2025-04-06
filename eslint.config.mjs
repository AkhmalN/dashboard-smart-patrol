import eslintPluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  { ignores: ['dist/', 'eslint.config.mjs'] },
  ...eslintPluginVue.configs['flat/essential'],
  {
    files: ['src/**/*.{js,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',

      // Tambahkan aturan untuk menangani variabel dan impor yang tidak digunakan
      'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],
      'no-undef': 'error', // Untuk memastikan variabel yang tidak terdefinisi akan dilaporkan
      'no-import-assign': 'error', // Untuk mencegah assignment langsung pada impor
      'unused-imports/no-unused-imports': 'error', // Memastikan impor yang tidak digunakan dilaporkan sebagai error
    },
  },
]
