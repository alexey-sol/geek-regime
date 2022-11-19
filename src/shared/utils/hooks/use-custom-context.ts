import React from "react";

import { ContextOutsideProviderError } from "@/shared/utils/errors";

export const useCustomContext = <Value>(
    Context: React.Context<Value | null>,
): Value | never => {
    const context = React.useContext(Context);

    if (context === null) {
        throw new ContextOutsideProviderError();
    }

    return context;
};
