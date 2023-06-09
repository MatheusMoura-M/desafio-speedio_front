import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    :root{
        
        --brand-1: #4529E6;
        --brand-2: #5126EA;
        --brand-3: #B0A6F0;
        --brand-4: #EDEAFD;

        --grey-0: #0B0D0D;
        --grey-1: #212529;
        --grey-2: #495057;
        --grey-3: #868E96;
        --grey-4: #ADB5BD;
        --grey-5: #DEE2E6;
        --grey-6: #F8F9FA;

        --alert-1: #CD2B31;
        --alert-2: #FDD8D8;
        --sucess-1: #18794E;
        --sucess-2: #CCEBD7;

        --random-1: #E34D8C;
        --random-3: #7D2A4D;
        --random-4: #7000FF;
        --random-6: #36007D;
        --random-8: #2A7D5F;
        --random-9: #153D2E;
        --random-11: #5700E3;
        --random-12: #30007D;

        --font: 'Lexend';
        
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        font-family: var(--font);
        list-style: none;
    }

    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
	    display: block;
    }

    body {
	    line-height: 1;
        height: 100vh;
    }

    ol, ul {
	    list-style: none;
    }

    blockquote, q {
	    quotes: none;
    }

    blockquote:before, blockquote:after,
    q:before, q:after {
	    content: '';
	    content: none;
    }

    table {
	    border-collapse: collapse;
	    border-spacing: 0;
    }

`;

export default GlobalStyle;
