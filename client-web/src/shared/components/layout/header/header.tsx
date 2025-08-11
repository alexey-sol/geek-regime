import React, { type FC } from "react";

import { LanguageSwitch } from "./language-switch";
import { AppTitle } from "./app-title";
import { HeaderInnerStyled, HeaderStyled } from "./style";

import { appConfig } from "@/config/app";

export const Header: FC = () => (
    <HeaderStyled>
        <HeaderInnerStyled>
            <AppTitle title={appConfig.appName} />
            <LanguageSwitch />
        </HeaderInnerStyled>
    </HeaderStyled>
);
