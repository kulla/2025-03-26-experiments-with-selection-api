import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  output: {
    assetPrefix: '/2025-03-22-vanilla-textarea/',
  },
  plugins: [pluginReact()],
})
