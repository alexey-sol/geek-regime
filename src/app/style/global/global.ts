import { createGlobalStyle } from "styled-components";

import { resetStyle } from "./reset";

import "./resources.scss";

export const GlobalStyle = createGlobalStyle`
    ${resetStyle};
`;
