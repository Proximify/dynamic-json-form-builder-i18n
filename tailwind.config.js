const uOttawaTheme = require('./clients/uOttawa/theme.js');
const McGillTheme = require('./clients/McGill/theme.js');
const UniwebTheme = require('./clients/Uniweb/theme');

const Themes = {
    'uOttawa': uOttawaTheme,
    'McGill': McGillTheme
}

function isObject(obj) {
    return (obj && typeof obj === 'object' && !Array.isArray(obj));
}

function mergeTheme(baseTheme, extendTheme) {
    if (!extendTheme || Object.keys(extendTheme).length < 1) {
        return baseTheme;
    } else {
        Object.keys(extendTheme).forEach(key => {
            const extendThemeValue = extendTheme[key];
            if (baseTheme[key]) {
                if (isObject(extendThemeValue)) {
                    extendTheme[key] = mergeTheme(baseTheme[key], extendThemeValue);
                } else {
                    baseTheme[key] = extendThemeValue;
                }
            } else {
                baseTheme[key] = extendThemeValue;
            }
        })
        return baseTheme;
    }
}

const combineTheme = Themes[process.env.REACT_APP_CLIENT] ? mergeTheme(UniwebTheme, Themes[process.env.REACT_APP_CLIENT]) : UniwebTheme;

module.exports = {
    mode: 'jit',
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
