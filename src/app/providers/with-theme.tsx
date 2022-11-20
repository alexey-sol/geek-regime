import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "@/app/style/theme";

export const withTheme = (component: () => JSX.Element) => () => (
    <ThemeProvider theme={theme}>
        {component()}
    </ThemeProvider>
);
