import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// 🔐 HTTPS 키/인증서 경로 설정
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync('./localhost-key.pem'),
      cert: fs.readFileSync('./localhost-cert.pem'),
    },
    port: 5173,
  },
})