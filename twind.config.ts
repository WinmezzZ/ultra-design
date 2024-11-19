import { defineConfig, autoDarkColor } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'
import { gray } from '@twind/preset-tailwind/colors'

console.log(gray)

export default  defineConfig({
  darkMode: 'class',
  darkColor: autoDarkColor,
  theme: {
    extend: {
      colors: {
        border: gray[400],
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)'
        }
      },
      borderWidth: {
        small: 'var(--border-width-small)',
        medium: 'var(--border-width-medium)',
        large: 'var(--border-width-large)',
      },
      outline: {
        small: 'var(--border-width-small)',
        medium: 'var(--border-width-medium)',
        large: 'var(--border-width-large)',
      }
    },
  },
  presets: [presetTailwind({ disablePreflight: true })],
  preflight: false
})