import { defineConfig } from 'vite';
import { resolve } from 'path';

/** Vite config for Monsters World Web */
export default defineConfig({
  root: '.',
  outDir: 'dist',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2020',
    sourcemap: true,
  },
});
