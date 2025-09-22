import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ base должен совпадать с именем репозитория на GitHub
// У тебя репозиторий называется "sales-script"
export default defineConfig({
  base: '/sales-script/',
  plugins: [react()],
})
