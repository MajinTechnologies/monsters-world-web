import { defineConfig } from 'vitest/config';

/** Vitest config for Monsters World Web — unit tests with DOM (happy-dom). */
export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
  },
});