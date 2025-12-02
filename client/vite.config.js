import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
  }},
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
