import React, { ReactNode } from "react";

import { MainInnerStyled, MainStyled } from "./style";

export type MainProps = {
    children: ReactNode;
};

export const Main = ({ children }: MainProps) => (
    <MainStyled>
        <MainInnerStyled>
            {children}
        </MainInnerStyled>
    </MainStyled>
);
