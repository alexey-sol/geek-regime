import { type Context, useContext } from "react";

import { ContextOutsideProviderError } from "@/shared/utils/errors";

const useCustomContext = <Value>(Ctx: Context<Value | null>): Value | never => {
    const context = useContext(Ctx);

    if (context === null) {
        throw new ContextOutsideProviderError();
    }

    return context;
};

export const getUseContextOrThrowError = <Value>(Ctx: Context<Value | null>): () => Value | never =>
    () => useCustomContext<Value>(Ctx);
