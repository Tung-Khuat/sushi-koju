import { createGlobalStyle } from 'styled-components';
import ProximaNovaReg from '../assets/fonts/Proxima-Nova-Reg.ttf';
import ProximaNovaBold from '../assets/fonts/Proxima-Nova-Bold.otf';
import Albertiny from '../assets/fonts/Albertiny-Demo.ttf';
import PhotographSignature from '../assets/fonts/Photograph-Signature.ttf';

const GlobalStyles = createGlobalStyle`
@font-face {
    font-family: Proxima Nova Regular;
    src:
        local("ProximaNovaReg"),
        url("./fonts/Proxima-Nova-Reg.ttf"),
        url(${ProximaNovaReg}) format('font/ttf');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: Proxima Nova Bold;
    src: 
        local("ProximaNovaBold"),
        url("./fonts/Proxima-Nova-Bold.otf"),
        url(${ProximaNovaBold}) format('font/otf');
    font-weight: bold;
    font-style: bold;
}

@font-face {
    font-family: Photograph-Signature;
    src:
        local("Photograph-Signature"),
        url("./fonts/Photograph-Signature.ttf"), 
        url(${PhotographSignature}) format('font/ttf');
    font-weight: bold;
    font-style: bold;
}

@font-face {
    font-family: Albertiny;
    src:
        local("Albertiny-Demo"),
        url("./fonts/Albertiny-Demo.ttf"), 
        url(${Albertiny}) format('font/ttf');
    font-weight: bold;
    font-style: bold;
}

a {
    text-decoration: none;
    color: inherit;
}

body {
    margin: 0;
    font-family: Proxima Nova Regular, sans-serif;
    font-size: 19px;
}

html {
    scroll-behavior: smooth;
}

* {
    margin: 0; 
    padding: 0;
    &:focus, &:visited {
        outline: none;
    }
}

`
export default GlobalStyles;