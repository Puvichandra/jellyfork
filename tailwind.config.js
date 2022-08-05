/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'] 
      },
   
    colors:{
      txtborderColor:"#9bbcd1",
      nftColor:"#1e2a31",
      h1Color:"#dcf3ff",
      txtred:"#FF0000",
      txtwhite:"#ffffff",
      bodygray:"#22313a",
      lightgrey:"#2b3c46",
    }
  }
  },
  plugins: [],
}
