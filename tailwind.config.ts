import type { Config } from "tailwindcss"
import colors from 'tailwindcss/colors'
import forms from '@tailwindcss/forms'

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      textColor: {
        'primary': colors.slate['900']
      }
    },
  },
  plugins: [
    forms
  ],
} satisfies Config