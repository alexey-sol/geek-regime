import React from "react";
import { appConfig } from "@/config/app";
import { AppTitle } from "./app-title";
import { LanguageSwitch } from "../language-switch";
import { HeaderInnerStyled, HeaderStyled } from "./style";

export const Header = () => (
    <HeaderStyled>
        <HeaderInnerStyled>
            <AppTitle title={appConfig.appName} />
            <LanguageSwitch />
        </HeaderInnerStyled>
    </HeaderStyled>
);
