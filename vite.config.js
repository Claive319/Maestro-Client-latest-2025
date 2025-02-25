// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias the datatables.net-dt path to its node_modules folder.
      'datatables.net-dt': path.resolve(__dirname, 'node_modules/datatables.net-dt')
    }
  }
});
