/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'backend/static',
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
