import { type Context, useContext } from "react";

import { ContextOutsideProviderError } from "./errors";

const useAppContext = <Value>(Ctx: Context<Value | null>): Value | never => {
    const context = useContext(Ctx);

    if (context === null) {
        throw new ContextOutsideProviderError(Ctx.displayName);
    }

    return context;
};

export const getUseContextOrThrowError =
    <Value>(Ctx: Context<Value | null>): (() => Value | never) =>
    () =>
        useAppContext<Value>(Ctx);
