/** @type {import('tailwindcss').Config} */
/* eslint-disable @typescript-eslint/no-var-requires */

const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
        code: ['Source Code Pro', 'monospace'],
      },
      boxShadow: {
        '3xl': '0 0px 60px -15px rgba(0, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}
