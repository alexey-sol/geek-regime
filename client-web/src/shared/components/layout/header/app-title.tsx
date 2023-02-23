import React, { type FC } from "react";

import { Typography } from "@/shared/components/typography";

import { TitleLinkStyled } from "./style";

export type TitleProps = {
    title: string;
    to?: string;
};

export const AppTitle: FC<TitleProps> = ({ title, to = "/" }) => (
    <TitleLinkStyled to={to}>
        <Typography
            color="white"
            font="logo"
            fontSize="larger"
        >
            {title}
        </Typography>
    </TitleLinkStyled>
);
