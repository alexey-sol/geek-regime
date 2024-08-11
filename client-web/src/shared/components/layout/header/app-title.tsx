import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

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
            fontSize="xl"
        >
            {title}
        </Typography>
    </TitleLinkStyled>
);
