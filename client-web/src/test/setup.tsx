import "@testing-library/jest-dom";
import "reflect-metadata";
import "whatwg-fetch";

import React, { type FC, type PropsWithChildren, type ReactElement } from "react";
import { Provider } from "react-redux";
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "@/app/style/theme";
import { store } from "@/app/store";
import { AuthContextProvider } from "@/features/auth/contexts/auth";

jest.mock("@/config/app", () => ({
    appConfig: {},
}));

jest.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (str: string) => str,
        i18n: {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            changeLanguage: () => new Promise(() => {}),
        },
    }),
}));

const Container: FC<PropsWithChildren> = ({ children }): JSX.Element => (
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    {children}
                </AuthContextProvider>
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
