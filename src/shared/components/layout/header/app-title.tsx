import React from "react";
import { Typography } from "@/shared/components/typography";
import { TitleLinkStyled } from "./style";

export type TitleProps = {
    title: string;
    to?: string;
};

export const AppTitle = ({ title, to = "/" }: TitleProps) => (
    <TitleLinkStyled to={to}>
        <Typography
            font="logo"
            color="white"
            size="larger"
        >
            {title}
        </Typography>
    </TitleLinkStyled>
);
