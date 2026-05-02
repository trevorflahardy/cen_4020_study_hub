import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use relative base so the build works at any subpath (incl. GitHub Pages
// project sites at https://<user>.github.io/<repo>/). Override with
// VITE_BASE_PATH=/foo/ when needed.
const base = process.env.VITE_BASE_PATH || './';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
