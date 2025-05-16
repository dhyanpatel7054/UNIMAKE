import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // Your backend server
        changeOrigin: true,
        rewrite: (path) => path // Remove this line if you want to keep /api prefix
      }
    },
    allowedHosts: ['d0fb-2405-201-200b-d0f3-152a-7d67-4051-92a.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  }
})