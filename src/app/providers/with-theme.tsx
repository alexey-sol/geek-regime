import React from "react";
import { theme } from "@/shared/style/theme";
import { ThemeProvider } from "styled-components";

export const withTheme = (component: () => JSX.Element) => () => (
    <ThemeProvider theme={theme}>
        {component()}
    </ThemeProvider>
);
