import React from "react";

import { useLanguage } from "@/shared/utils/language";

import { getFilteredLanguages, getLanguageTitle } from "./utils";
import { LanguageDropdownStyled, SwitchButtonStyled, SwitchListStyled } from "./style";

export type LanguageDropdownProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const LanguageDropdown = ({ anchorRef, onClose }: LanguageDropdownProps) => {
    const { language, setLanguage } = useLanguage();

    const items = getFilteredLanguages(language)
        .map((lang) => {
            const handleClick = () => {
                setLanguage(lang).catch(console.error);
                onClose();
            };

            return (
                <li key={lang}>
                    <SwitchButtonStyled
                        isStretched
                        size="smaller"
                        onClick={handleClick}
                        variation="secondary"
                    >
                        {getLanguageTitle(lang)}
                    </SwitchButtonStyled>
                </li>
            );
        });

    return (
        <LanguageDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            position="bottom-center"
        >
            <SwitchListStyled>
                {items}
            </SwitchListStyled>
        </LanguageDropdownStyled>
    );
};
