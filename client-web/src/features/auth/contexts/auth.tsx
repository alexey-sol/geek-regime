import React, { type FC, type PropsWithChildren } from "react";
import { getUseContextOrThrowError } from "@eggziom/geek-regime-js-ui-kit/utils";

import { useAuthApi, type UseAuthApiResult } from "@/features/auth/utils/hooks";

export const AuthContext = React.createContext<UseAuthApiResult | null>(null);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const authApi = useAuthApi();

    return (
        <AuthContext.Provider value={authApi}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = "AuthContext";

export const useAuthContext = getUseContextOrThrowError<UseAuthApiResult>(AuthContext);
