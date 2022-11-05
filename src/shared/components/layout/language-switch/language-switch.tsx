import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useLanguage } from "@/shared/utils/language";
import { GlobeIcon } from "@/shared/components/icon";
import { getLanguageTitle } from "./utils";
import { SwitchButton } from "./switch-button";
import { LanguageDropdown } from "./language-dropdown";

export const LanguageSwitchStyled = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    min-width: 8rem;
    height: 100%;
`;

export const SwitchButtonStyled = styled(SwitchButton)`
     background-color: ${({ theme }) => theme.colors.purpleDark};
`;

export const LanguageSwitch = () => {
    const { language } = useLanguage();
    const languageSwitchRef = useRef<HTMLElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown((show) => !show);

    return (
        <LanguageSwitchStyled ref={languageSwitchRef}>
            <SwitchButtonStyled icon={GlobeIcon} onClick={toggleDropdown}>
                {getLanguageTitle(language)}
            </SwitchButtonStyled>

            {showDropdown && (
                <LanguageDropdown
                    anchorRef={languageSwitchRef}
                    onClose={toggleDropdown}
                />
            )}
        </LanguageSwitchStyled>
    );
};
