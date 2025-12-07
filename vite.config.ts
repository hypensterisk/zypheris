/** @format */

import react from '@vitejs/plugin-react'
import pluginEruda from '@zhaojjiang/vite-plugin-eruda'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const isDev = mode === 'development'
  return {
    plugins: [
      react(),
      isDev && pluginEruda({ enabled: isDev, entry: 'src/index.jsx' }),
    ],
    base: env.VITE_BASE,
    resolve: {
      alias: {
        '@fields': path.resolve(__dirname, './src/fields'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
  }
})
