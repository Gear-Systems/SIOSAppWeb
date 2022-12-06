const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'gris-claro': '#C4C4C4',
        'primario': '#2166E5',
        'secundario': '#E9F0FC',
        'azul-marino': '#101D2D',
        'hover': '#E9F0FC',
        'tipografia': "#7C8495",
        'negro': "#101010",
        'capturado': "#BDC5F2",
        "asignados": "#2166E5",
        "en-camino": "#297350",
        "en-proceso": "#44C4A1",
        "cerrados": "#F20C1F",
        "finalizados": "#27A2DB",
        "pausados": "#F28705",
        "programados": "#F5CE5D",
        "default": "#E5E6EA",
      },
      transitionDuration: {
        '0': '0ms',
        '1500': '1500ms',
      },
      boxShadow: {
        'customized': '0 2px 10px 2px rgba(0, 0, 0, 0.05)',
        'box': '0 2px 10px 2px rgba(0, 0, 0, 0.09)',
        // 'costomized': 'inset 0 -5px 85px -47px rgba(0, 0, 0, 1)',
      },
      keyframes: {
        shake: {
          '0%': { 
            transform: 'translateX(0px)'
          },
          '25%': {
            transform: 'translateX(-0.375rem)'
          },
          '50%': {
            transform: 'translateX(-0.5rem)'
          },
          '75%': {
            transform: 'translateX(0.375rem)'
          },
          '100%': { 
              transform: 'translateX(0.5rem)' 
          },
        }
      },
      animation: {
        shake: 'shake 200ms ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
  ],
}
