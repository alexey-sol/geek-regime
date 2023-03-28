import React, { type FC, type PropsWithChildren } from "react";

import { MainInnerStyled, MainStyled } from "./style";

export const Main: FC<PropsWithChildren> = ({ children }) => (
    <MainStyled>
        <MainInnerStyled>
            {children}
        </MainInnerStyled>
    </MainStyled>
);
