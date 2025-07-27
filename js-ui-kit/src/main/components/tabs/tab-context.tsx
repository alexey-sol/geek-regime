import React, {
    type FC, type PropsWithChildren, useCallback, useMemo, useState,
} from "react";

import { getUseContextOrThrowError } from "@/utils/context";

import { type HandleChange } from "./types";

type TabContextValue = {
    onChange: HandleChange;
    value?: string;
};

export type TabsContextProps = PropsWithChildren<{
    initialValue?: string;
    onChange?: HandleChange;
}>;

export const TabContext = React.createContext<TabContextValue | null>(null);

export const TabContextProvider: FC<TabsContextProps> = ({
    children,
    initialValue,
    onChange,
}) => {
    const [value, setValue] = useState<string | undefined>(initialValue);

    const handleChange = useCallback<HandleChange>((newValue) => {
        setValue(newValue);

        if (onChange) {
            onChange(newValue);
        }
    }, [onChange]);

    const contextValue = useMemo(() => ({
        onChange: handleChange,
        value,
    }), [handleChange, value]);

    return (
        <TabContext.Provider value={contextValue}>
            {children}
        </TabContext.Provider>
    );
};

TabContext.displayName = "TabContext";

export const useTabContext = getUseContextOrThrowError<TabContextValue>(TabContext);
