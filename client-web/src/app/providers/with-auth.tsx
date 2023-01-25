import React from "react";

import { AuthContextProvider } from "@/features/auth/contexts/auth";

export const withAuth = (component: () => JSX.Element) => () => (
    <AuthContextProvider>
        {component()}
    </AuthContextProvider>
);
