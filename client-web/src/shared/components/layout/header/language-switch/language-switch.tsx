import React, { type FC, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";

import { getLanguageTitle } from "./utils";
import { LanguageDropdown } from "./language-dropdown";
import { LanguageSwitchStyled } from "./style";

import { useLanguage } from "@/shared/utils/language";

export const LanguageSwitch: FC = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const languageSwitchRef = useRef<HTMLElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown((show) => !show);

    return (
        <LanguageSwitchStyled ref={languageSwitchRef}>
            <I18nIconButton
                onClick={toggleDropdown}
                title={getLanguageTitle(language) ?? t("shared.navbar.i18nButton.tooltip")}
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
