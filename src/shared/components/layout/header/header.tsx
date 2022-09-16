import React from "react";
import { Typography } from "@/shared/components/typography";
import { HeaderInnerStyled, HeaderStyle } from "./header.style";

export const Header = () => (
    <HeaderStyle>
        <HeaderInnerStyled>
            <Typography>Geek Regime</Typography>
        </HeaderInnerStyled>
    </HeaderStyle>
);
