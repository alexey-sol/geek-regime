import React, { type FC, type PropsWithChildren } from "react";
import styled from "styled-components";

import { useTabContext } from "./tab-context";

export type TabPanelProps = PropsWithChildren<{
    value: string;
}>;

const TabPanelStyled = styled.section`
    height: 100%;
`;

export const TabPanel: FC<TabPanelProps> = ({ children, value }) => {
    const { value: activeValue } = useTabContext();

    if (activeValue !== value) {
        return null;
    }

    return <TabPanelStyled role="tabpanel">{children}</TabPanelStyled>;
};
