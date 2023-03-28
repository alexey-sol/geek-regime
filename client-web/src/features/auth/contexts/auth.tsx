import React, { type FC, type PropsWithChildren } from "react";

import { getUseContextOrThrowError } from "@/shared/utils/helpers/context";
import { useAuthApi, UseAuthApiResult } from "@/features/auth/utils/hooks";

export const AuthContext = React.createContext<UseAuthApiResult | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const authApi = useAuthApi();

    return (
        <AuthContext.Provider value={authApi}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = getUseContextOrThrowError<UseAuthApiResult>(AuthContext);
