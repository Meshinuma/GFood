/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          purple: '#9810FA',
          purpleRgb: 'rgb(152, 16, 250)',
        },
        gray: {
          light: '#F5F5F5',
          text: '#737373',
        },
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      width: {
        'btn-sm': '165px',
        'btn-md': '448px',
        'modal-content': '736px',
        'modal-lg': '784px',
      },
      height: {
        'btn': '44px',
      },
      fontSize: {
        'heading-lg': '30px',
        'heading-md': '24px',
        'heading-sm': '20px',
        'body-lg': '18px',
        'body-md': '16px',
      },
      lineHeight: {
        'heading': '120%',
        'body': '150%',
      },
    },
  },
  plugins: [],
}
