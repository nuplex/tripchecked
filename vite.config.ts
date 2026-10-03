import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  build: {
    emptyOutDir: true,
  },
  base: '/tripchecked/',
  server: {
    port: 5174
  },
});
