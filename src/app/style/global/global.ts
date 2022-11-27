import { createGlobalStyle } from "styled-components";

import { resourcesStyle } from "./resources";
import { resetStyle } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${resourcesStyle};
    ${resetStyle};
`;
