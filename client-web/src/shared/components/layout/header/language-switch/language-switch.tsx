import React, { type FC, useRef, useState } from "react";

import { useLanguage } from "@/shared/utils/language";
import { I18nIconButton } from "@/shared/components/icon-button";

import { getLanguageTitle } from "./utils";
import { LanguageDropdown } from "./language-dropdown";
import { LanguageSwitchStyled } from "./style";

export const LanguageSwitch: FC = () => {
    const { language } = useLanguage();
    const languageSwitchRef = useRef<HTMLElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown((show) => !show);

    return (
        <LanguageSwitchStyled ref={languageSwitchRef}>
            <I18nIconButton
                onClick={toggleDropdown}
                title={getLanguageTitle(language)}
                view="white"
            />

            {showDropdown && (
                <LanguageDropdown
                    anchorRef={languageSwitchRef}
                    onClose={toggleDropdown}
                />
            )}
        </LanguageSwitchStyled>
    );
};
