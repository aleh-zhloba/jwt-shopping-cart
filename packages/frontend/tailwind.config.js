/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
}

