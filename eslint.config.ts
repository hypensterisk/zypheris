/** @format */

import { defineConfig, globalIgnores } from 'eslint/config'
import type {
  ConfigWithExtends,
  Config,
  ExtendsElement,
} from '@eslint/config-helpers'
import * as tseslint from 'typescript-eslint'
import js from '@eslint/js'
import { importX } from 'eslint-plugin-import-x'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const baseConfig: ConfigWithExtends = {
  languageOptions: { parserOptions: { projectService: true } },
  plugins: { 'unused-imports': unusedImports },
  rules: {
    'import-x/order': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': 'error',
    'no-console': 'error',
  },
}

const nodeConfig = {
  files: ['**/*.ts'],
  ignores: ['public', 'src'],
  languageOptions: { globals: globals.nodeBuiltin },
}

const appConfig = {
  files: ['src/**/*.{ts,tsx}'],
  extends: [
    reactPlugin.configs.flat['recommended'] as ExtendsElement,
    reactPlugin.configs.flat['jsx-runtime'] as ExtendsElement,
    reactHooks.configs.flat['recommended-latest'],
    jsxA11y.flatConfigs.strict,
  ],
  languageOptions: { globals: globals.browser },
  settings: { react: { version: 'detect' } },
}

const config: Config[] = defineConfig([
  globalIgnores(['.github', '.husky', 'dist', '**/*.{js,cjs,mjs}']),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  importX.flatConfigs.recommended as ConfigWithExtends,
  importX.flatConfigs.typescript as ConfigWithExtends,
  baseConfig,
  nodeConfig,
  appConfig,
  eslintConfigPrettier,
])

export default config
