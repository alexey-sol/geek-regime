import React from "react";

export const useCustomContext = <Value>(
    Context: React.Context<Value | null>
): Value | never => {
    const context = React.useContext(Context);

    if (context === null) {
        throw new Error("The hook must be used within the provider"); // TODO const
    }

    return context;
};
