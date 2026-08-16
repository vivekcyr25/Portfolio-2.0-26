import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'copy-404-html',
      closeBundle() {
        try {
          const distDir = path.resolve(__dirname, 'dist');
          const distIndex = path.resolve(distDir, 'index.html');
          const dist404 = path.resolve(distDir, '404.html');
          const public404 = path.resolve(__dirname, 'public', '404.html');

          if (fs.existsSync(public404)) {
            fs.copyFileSync(public404, dist404);
          } else if (fs.existsSync(distIndex)) {
            fs.copyFileSync(distIndex, dist404);
          }
        } catch (err) {
          console.warn('Could not copy 404.html:', err);
        }
      }
    }
  ],
  // Use repository sub-path for production build on GitHub Pages
  base: command === 'build' ? '/Portfolio-2.0-26/' : '/',
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
}));

