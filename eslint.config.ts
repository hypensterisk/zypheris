/** @format */

import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'

const baseConfig = {
  languageOptions: { parserOptions: { projectService: true } },
}

const nodeConfig = { files: ['**/*.ts'], ignores: ['public', 'src'] }

const appConfig = { files: ['src/**/*.{ts,tsx}'] }

export default defineConfig([
  globalIgnores(['.github', '.husky', 'dist', '**/*.{js,cjs,mjs}']),
  tseslint.configs.strictTypeChecked,
  baseConfig,
  nodeConfig,
  appConfig,
])
