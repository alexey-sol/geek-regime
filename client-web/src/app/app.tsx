import React from "react";

import { Layout } from "@/shared/components/layout";

import { withProviders } from "./providers";
import { AppRoutes } from "./app-routes";

export const App = () => (
    <Layout>
        <AppRoutes />
    </Layout>
);

export const AppWithProviders = withProviders(App);
