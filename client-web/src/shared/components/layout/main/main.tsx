import React, { type FC } from "react";

import type { HasChildren } from "@/shared/types/props";

import { MainInnerStyled, MainStyled } from "./style";

export const Main: FC<HasChildren> = ({ children }) => (
    <MainStyled>
        <MainInnerStyled>
            {children}
        </MainInnerStyled>
    </MainStyled>
);
