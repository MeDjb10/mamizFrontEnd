/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors:{
        "lightpink":"#fff7f7",
        "pink":"#ff9eaa",
        "darkpink":"#ff687b",
        "teal":"#3aa6b9",
        "lightblue":"#a5f2ff",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

