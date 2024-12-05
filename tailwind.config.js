/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {},
    colors:{
      'p_blue':{
        100: '#B1EDE8',
        200: '#0D1B2A',
      },
      'p_yellow': '#E7E247',
      'black': '#000',
      'white': '#FFF',
      'red':'#FF0000',
      'gray':{
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280'
      },
      'shadow': 'shadow'
    },
  },
  plugins: [],
}