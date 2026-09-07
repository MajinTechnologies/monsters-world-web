/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-bg': '#1e1e2e',
        'game-orange': '#f59e0b',
        'game-purple': '#8b5cf6',
        'game-blue': '#4a9eed',
        'game-green': '#22c55e',
        'game-gray': '#a0a0a0',
        'game-red': '#ef4444',
      },
    },
  },
  plugins: [],
};
