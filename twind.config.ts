import { defineConfig } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'

export default defineConfig({
  presets: [presetTailwind({ disablePreflight: true })],
  preflight: false
})