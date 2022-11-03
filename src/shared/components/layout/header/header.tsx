import React, { useRef, useState } from "react";
import { useLanguage } from "@/shared/utils/language";
import { appConfig } from "@/config/app";
import { getLanguageTitle } from "@/shared/components/layout/header/utils";
import { AppTitle } from "./app-title";
import {
    HeaderInnerStyled,
    HeaderStyled,
    LanguageSwitchStyled,
    LanguageSwitchWrapStyled,
} from "./style";
import { LanguageSwitchDropdown } from "./language-switch-dropdown";

export const Header = () => {
    const { language } = useLanguage();

    const languageSwitchRef = useRef<HTMLElement>(null);
    const [showLanguageSwitchDropdown, setShowLanguageSwitchDropdown] = useState(false);

    const switchLanguageSwitchDropdown = () => setShowLanguageSwitchDropdown((show) => !show);

    return (
        <HeaderStyled>
            <HeaderInnerStyled>
                <AppTitle title={appConfig.appName} />

                <LanguageSwitchWrapStyled ref={languageSwitchRef}>
                    <LanguageSwitchStyled
                        onClick={switchLanguageSwitchDropdown}
                        variation="plain"
                    >
                        {getLanguageTitle(language)}
                    </LanguageSwitchStyled>
                </LanguageSwitchWrapStyled>
            </HeaderInnerStyled>

            {showLanguageSwitchDropdown && (
                <LanguageSwitchDropdown
                    anchorRef={languageSwitchRef}
                    onClose={switchLanguageSwitchDropdown}
                />
            )}
        </HeaderStyled>
    );
};
