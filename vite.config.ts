/** @format */

import path from 'node:path'
import react from '@vitejs/plugin-react'
import pluginEruda from '@zhaojjiang/vite-plugin-eruda'
import { defineConfig, loadEnv } from 'vite'
import type { UserConfigFnObject } from 'vite'

const config: UserConfigFnObject = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const viteBase = env['VITE_BASE']
  if (viteBase === undefined) {
    throw new Error(
      '[vite.config.ts] Missing required environment variable: "VITE_BASE". Please ensure it is defined',
    )
  }
  const isDev = mode === 'development'
  return {
    plugins: [
      react(),
      isDev && pluginEruda({ enabled: isDev, entry: 'src/index.jsx' }),
    ],
    base: viteBase,
    resolve: {
      alias: {
        '@fields': path.resolve(__dirname, './src/fields'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@components': path.resolve(__dirname, './src/components'),
      },
    },
  }
})
export default config
