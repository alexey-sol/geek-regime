import React, { type FC } from "react";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { TitleLinkStyled } from "./style";

import { paths } from "@/shared/const";

export type TitleProps = {
    title: string;
    to?: string;
};

export const AppTitle: FC<TitleProps> = ({ title, to = paths.INDEX }) => (
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
