/** @format */

import react from '@vitejs/plugin-react'
import pluginEruda from '@zhaojjiang/vite-plugin-eruda'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    pluginEruda({ enable: process.env.DEV, entry: 'src/index.jsx' }),
  ],
  base: process.env.VITE_BASE,
  resolve: {
    alias: {
      '@fields': path.resolve(__dirname, './src/fields'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
})
