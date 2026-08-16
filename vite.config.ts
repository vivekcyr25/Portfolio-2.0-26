import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Set GITHUB_PAGES=true in CI env to enable the correct sub-path base
  base: process.env.GITHUB_PAGES === 'true' ? '/Portfolio-2.0-26/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@syncfusion')) {
              return 'syncfusion';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
