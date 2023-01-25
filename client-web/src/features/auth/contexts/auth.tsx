import React from "react";

import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { useAuthApi, UseAuthApiResult } from "@/features/auth/utils/hooks";
import type { HasChildren } from "@/shared/types/props";

export const AuthContext = React.createContext<UseAuthApiResult | null>(null);

export const AuthContextProvider = ({ children }: HasChildren) => {
    const authApi = useAuthApi();

    return (
        <AuthContext.Provider value={authApi}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = getUseContextOrThrowError<UseAuthApiResult>(AuthContext);
