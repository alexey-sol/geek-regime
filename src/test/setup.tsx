import "@testing-library/jest-dom";
import "reflect-metadata";

import React, { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "@/shared/style/theme";
import { store } from "@/app/store";

jest.mock("@/config/app", () => ({
    appConfig: {},
}));

const Container = ({ children }: { children: ReactNode }): JSX.Element => (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </BrowserRouter>
    </Provider>
);

const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "queries">,
): RenderResult => render(
    ui,
    {
        wrapper: Container,
        ...options,
    },
);

export * from "@testing-library/react";

export { renderWithProviders as render };
