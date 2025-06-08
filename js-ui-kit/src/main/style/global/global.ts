import { createGlobalStyle, css } from "styled-components";

import "./resources.scss";

const resetStyle = css`
    html {
        box-sizing: border-box;
        font-size: 10px;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        overflow-y: scroll;
    }

    button {
        &:disabled {
            color: initial;
        }
    }

    p, h1, h2, h3, h4, h5, h6, ul {
        margin: 0;
    }

    ul {
        padding: 0;
        list-style-type: none;
    }

    a {
        color: initial;
        text-decoration: none;
    }
`;

export const GlobalStyle = createGlobalStyle`
    ${resetStyle};
`;
