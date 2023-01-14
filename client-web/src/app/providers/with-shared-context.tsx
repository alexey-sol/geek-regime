import React from "react";

import { AuthProvider } from "@/features/auth/contexts/auth";

export const withSharedContext = (component: () => JSX.Element) => () => (
    <AuthProvider>
        {component()}
    </AuthProvider>
);
