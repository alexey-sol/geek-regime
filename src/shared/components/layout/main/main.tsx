import React, { ReactNode } from "react";
import { MainStyled } from "@/shared/components/layout/main/main.style";

export type MainProps = {
    children: ReactNode;
}

export const Main = ({ children }: MainProps) => (
    <MainStyled>{children}</MainStyled>
);
