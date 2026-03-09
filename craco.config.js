// CRACO config to add Tailwind (PostCSS) support without ejecting CRA
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}


