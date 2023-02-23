import React, { type FC } from "react";

import { Layout } from "@/shared/components/layout";

import { withProviders } from "./app-providers";
import { AppRoutes } from "./app-routes";

export const App: FC = () => (
    <Layout>
        <AppRoutes />
    </Layout>
);

export const AppWithProviders = withProviders(App);
