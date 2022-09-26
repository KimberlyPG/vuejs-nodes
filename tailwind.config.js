/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    screens: {
      'xxs': '350px',
      'xs': '400px',
      'sm': '640'
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ]
}
