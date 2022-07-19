/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'greenColor': '#038d84',
      'graySubTitle': '#5e6062',
      'yellowWefinder': '#FFB900',
    },
    /* fontFamily: {
      sans: [
        "Roboto Slab"
      ]
    } */
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
