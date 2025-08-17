import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Local dev proxy to avoid CORS when hitting AIID GraphQL directly (if needed)
      '/aiid-proxy': {
        target: 'https://incidentdatabase.ai',
        changeOrigin: true,
        secure: true
      }
    }
  }
})
