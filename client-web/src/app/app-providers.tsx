import React, { type FC, StrictMode, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import { withTranslation } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "@eggziom/geek-regime-js-ui-kit/components/error-boundary";
import { GlobalStyle } from "@eggziom/geek-regime-js-ui-kit/style";

import { store } from "@/app/store";
import { theme } from "@/app/style/theme";
import { AppLoader } from "@/shared/components/loaders";
import { AuthContextProvider } from "@/features/auth/contexts/auth";

type WithProvider = (component: FC<void>) => FC<void>;

export const withStore: WithProvider = (component) => () => (
    <Provider store={store}>
        {component()}
    </Provider>
);

export const withTheme: WithProvider = (component) => () => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {component()}
    </ThemeProvider>
);

export const withRouter: WithProvider = (component) => () => (
    <BrowserRouter>
        <Suspense fallback={<AppLoader />}>
            {component()}
        </Suspense>
    </BrowserRouter>
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
    withTheme,
    withRouter,
    withFallback,
    withAuth,
);
