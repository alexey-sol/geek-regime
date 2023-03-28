import React, { type FC, type PropsWithChildren } from "react";

import { useTabContext } from "./tab-context";

export type TabPanelProps = PropsWithChildren<{
    value: string;
}>;

export const TabPanel: FC<TabPanelProps> = ({ children, value }) => {
    const {
        value: activeValue,
    } = useTabContext();

    if (activeValue !== value) {
        return null;
    }

    return (
        <section role="tabpanel">
            {children}
        </section>
    );
};
