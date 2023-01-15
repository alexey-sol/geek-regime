import React from "react";

import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { useAuth } from "@/features/auth/utils/hooks";
import type { HasChildren } from "@/shared/types/props";
import type { UseAuthResult } from "@/features/auth/utils/hooks";

export const AuthContext = React.createContext<UseAuthResult | null>(null);

export const AuthProvider = ({ children }: HasChildren) => {
    const value = useAuth();

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = getUseContextOrThrowError(AuthContext);
