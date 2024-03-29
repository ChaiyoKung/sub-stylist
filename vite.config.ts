import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'popup.html',
        'service-worker': './src/service-worker.ts',
        'content-scripts/netflix': './src/content-scripts/netflix.ts',
      },

      // build without hash
      // https://github.com/vitejs/vite/issues/378#issuecomment-768816653
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
