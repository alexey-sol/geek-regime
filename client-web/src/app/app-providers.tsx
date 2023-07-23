import React, { type FC, StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { withTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary, GlobalStyle } from "@eggziom/geek-regime-js-ui-kit";
import "@eggziom/geek-regime-js-ui-kit/dist/main/global.css";

import { store } from "@/app/store";
import { theme } from "@/app/style/theme";
import { AuthContextProvider } from "@/features/auth/contexts/auth";
import { Loader } from "@/shared/components/loader";

type WithProvider = (component: FC<void>) => FC<void>;

export const withStore: WithProvider = (component) => () => (
    <Provider store={store}>
        {component()}
    </Provider>
);

export const withRouter: WithProvider = (component) => () => (
    <BrowserRouter>
        <Suspense fallback={<Loader />}>
            {component()}
        </Suspense>
    </BrowserRouter>
);

export const withTheme: WithProvider = (component) => () => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {component()}
    </ThemeProvider>
);

export const withFallback: WithProvider = (component) => () => (
    <StrictMode>
        <ErrorBoundary>
            {component()}
        </ErrorBoundary>
    </StrictMode>
);

export const withAuth: WithProvider = (component) => () => (
    <AuthContextProvider>
        {component()}
    </AuthContextProvider>
);

export const withProviders = compose<FC>(
    withTranslation(),
    withStore,
    withRouter,
    withTheme,
    withFallback,
    withAuth,
);
