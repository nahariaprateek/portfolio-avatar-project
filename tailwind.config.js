/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        airbnb: {
          primary: '#FF385C',
          dark: '#222222',
          gray: '#717171',
          light: '#DDDDDD',
          bg: '#F7F7F7',
          white: '#FFFFFF'
        }
      },
      borderRadius: {
        airbnb: '12px',
        airbnbLg: '16px'
      },
      boxShadow: {
        header: '0 6px 16px rgba(0, 0, 0, 0.08)',
        popover: '0 8px 24px rgba(0, 0, 0, 0.12)'
      },
      letterSpacing: {
        tightish: '-0.01em'
      }
    }
  },
  plugins: []
};
