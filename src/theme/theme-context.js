import React from 'react';

export const themes = {
    colorTheme1:  {
        background: "#fff",
        lightest: "#fff",
        secondaryLight: "#e2e2e2",
        secondaryDark: "#81171b",
        darkest: "#212121",
        highlight: "#b72f33",
        paletteArray: [ "#81171b", "#b72f33", "#e2e2e2", "#fff", "#212121"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
    colorTheme2:  {
        background: "#ffffff",
        lightest: "#ffffff",
        secondaryLight: "#d9d9d9",
        secondaryDark: "#284b63",
        darkest: "#353535",
        highlight: "#3c6e71",
        paletteArray: ["#353535","#3c6e71","#ffffff","#d9d9d9", "#284b63"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
    colorTheme3:  {
        background: "#e0fbfc",
        lightest: "#e0fbfc",
        secondaryLight: "#98c1d9",
        darkest: "#293241",
        highlight: "#ee6c4d",
        paletteArray: ["#3d5a80","#98c1d9","#e0fbfc","#ee6c4d", "#293241"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
    colorTheme4:  {
        background: "#f1faee",
        lightest: "#f1faee",
        secondaryLight: "#a8dadc",
        secondaryDark: "#457b9d",
        darkest: "#1d3557",
        highlight: "#e63946",
        paletteArray: ["#e63946","#f1faee","#a8dadc","#457b9d", "#1d3557"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
    colorTheme5:  {
        background: "#cad2c5",
        lightest: "#cad2c5",
        secondaryLight: "#84a98c",
        secondaryDark: "#354f52",
        darkest: "#2f3e46",
        highlight: "#52796f",
        paletteArray: ["#cad2c5","#84a98c","#52796f","#354f52", "#2f3e46"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
    colorTheme6:  {
        background: "#dce1de",
        lightest: "#dce1de",
        secondaryLight: "#9cc5a1",
        secondaryDark: "#216869",
        darkest: "#1f2421",
        highlight: "#49a078",
        paletteArray: ["#1f2421","#216869","#49a078","#9cc5a1", "#dce1de"],
        get paletteArrayNoBackground() {
            return removeBackgroundColor(
                this.paletteArray,
                this.background
            )
        } 
    },
}


function removeBackgroundColor (array, color) {
    const index = array.indexOf(color);
    array.splice(index, 1);
    return array;
}

export const ThemeContext = React.createContext({
    theme: themes.colorTheme1,
    switchTheme: () => {},
});


