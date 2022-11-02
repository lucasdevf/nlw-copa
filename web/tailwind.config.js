/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif'
      },

      backgroundImage: {
        app: 'url(/app-bg.png)'
      },

      colors: {
        ignite: {
          500: '#129E57'
        },

        yellow: {
          500: '#F7DD43',
          700: '#E5CD3D'
        },

        red: {
          500: '#EF4444',
          600: '#DC2626'
        },

        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          700: '#29292E',
          800: '#202024',
          900: '#121214',
        },
      },

      borderWidth: {
        1: '1px'
      }
    },
  },
  plugins: [],
}
