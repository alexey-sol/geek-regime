import React from "react";
import { Header } from "@/features/header";
import { withProviders } from "./providers";
import { AppRoutes } from "./app-routes";

export const App = () => (
    <>
        <Header />
        <AppRoutes />
    </>
);

export const AppWithProviders = withProviders(App);
