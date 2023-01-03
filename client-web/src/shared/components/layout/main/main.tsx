import React from "react";

import type { HasChildren } from "@/shared/types/props";

import { MainInnerStyled, MainStyled } from "./style";

export type MainProps = HasChildren;

export const Main = ({ children }: MainProps) => (
    <MainStyled>
        <MainInnerStyled>
            {children}
        </MainInnerStyled>
    </MainStyled>
);
