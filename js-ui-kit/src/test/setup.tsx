import "@testing-library/jest-dom";
import React, {
    type FC,
    type PropsWithChildren,
    type ReactElement,
} from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";

import { baseTheme } from "@/style/theme";

export const Wrapper: FC<PropsWithChildren> = ({ children }): JSX.Element => (
    <BrowserRouter>
        <ThemeProvider theme={baseTheme}>
            {children}
        </ThemeProvider>
    </BrowserRouter>
);

export const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "queries">,
): RenderResult => render(
    ui,
    {
        wrapper: Wrapper,
        ...options,
    },
);

export * from "@testing-library/react";

export { renderWithProviders as render };
