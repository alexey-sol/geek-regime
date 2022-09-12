import React from "react";
import { Typography } from "@/shared/components/typography";
import { ContentStyled, HeaderStyle } from "./header.style";

export const Header = () => (
    <HeaderStyle>
        <ContentStyled>
            <Typography>Geek Regime</Typography>
        </ContentStyled>
    </HeaderStyle>
);
