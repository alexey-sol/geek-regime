import React from "react";
import { useCustomContext } from "@/shared/utils/hooks/use-custom-context";

export const getUseContextOrThrowError = <Value>(
    Context: React.Context<Value | null>,
): () => Value | never => (): Value | never => useCustomContext<Value>(Context);
