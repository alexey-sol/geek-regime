import React from "react";

import { appConfig } from "@/config/app";

import { LanguageSwitch } from "./language-switch";
import { AppTitle } from "./app-title";
import { HeaderInnerStyled, HeaderStyled } from "./style";

export const Header = () => (
    <HeaderStyled>
        <HeaderInnerStyled>
            <AppTitle title={appConfig.appName} />
            <LanguageSwitch />
        </HeaderInnerStyled>
    </HeaderStyled>
);
