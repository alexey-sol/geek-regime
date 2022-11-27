import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "@/app/style/theme";
import { GlobalStyle } from "@/app/style/global";

export const withTheme = (component: () => JSX.Element) => () => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {component()}
    </ThemeProvider>
);
