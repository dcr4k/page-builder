import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // No desenvolvimento local (npm run dev) roda na raiz '/'
  // No build de produção (npm run build) prepara os caminhos para o GitHub Pages '/page-builder/'
  base: command === 'build' ? '/page-builder/' : '/',
}))
