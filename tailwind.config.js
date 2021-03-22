const uOttawaTheme = require('./clients/uOttawa/theme.json');
const McGillTheme = require('./clients/McGill/theme.json');
const UniwebTheme = require('./clients/Uniweb/theme');

console.log("=====", process.env.REACT_APP_CLIENT)

const Themes = {
    'uOttawa': uOttawaTheme,
    'McGill': McGillTheme
}

const combineTheme = Object.assign(Themes[process.env.REACT_APP_CLIENT],UniwebTheme)

console.log(combineTheme)

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: combineTheme,
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
