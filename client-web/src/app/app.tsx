import React, { type FC } from "react";

import { withProviders } from "./app-providers";
import { AppRoutes } from "./app-routes";

import { Layout } from "@/shared/components/layout";

export const App: FC = () => (
    <Layout>
        <AppRoutes />
    </Layout>
);

export const AppWithProviders = withProviders(App);
