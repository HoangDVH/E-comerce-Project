/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.06)',
        'card-hover': '0 2px 4px rgba(0,0,0,.08), 0 4px 16px rgba(0,0,0,.08)'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: theme('maxWidth.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          '@screen sm': {
            paddingLeft: theme('spacing.5'),
            paddingRight: theme('spacing.5')
          },
          '@screen lg': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6')
          }
        }
      })
    })
  ]
}
