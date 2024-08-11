import React, { type FC, type PropsWithChildren } from "react";
import styled from "styled-components";

import * as cn from "./const";

const TabBarStyled = styled.ul`
    display: flex;
    column-gap: 1rem;
    width: 100%;
    box-shadow: inset 0 -${cn.TAB_BORDER_WIDTH} 0 ${({ theme }) => theme.colors.greyLighten};
    list-style-type: none;
`;

export const TabBar: FC<PropsWithChildren> = ({ children }) => (
    <TabBarStyled role="tablist">
        {children}
    </TabBarStyled>
);
