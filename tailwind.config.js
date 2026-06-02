/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eink: {
          bg: '#EFEFEF',
          ink: '#222222',
          screen: '#A5B69C',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        serif: ['Lora', 'serif'],
      },
      boxShadow: {
        'sketch': '6px 6px 0px #222222',
        'sketch-hover': '8px 8px 0px #222222',
        'nokia': 'inset -6px -6px 0px rgba(0,0,0,0.06), inset 6px 6px 0px rgba(255,255,255,1), 10px 10px 0px #222222',
      }
    },
  },
  plugins: [],
}