import React, { type FC } from "react";
import { type ElementPosition } from "@eggziom/geek-regime-js-ui-kit/components/base-popup";

import { getFilteredLanguages, getLanguageTitle } from "./utils";
import { LanguageDropdownStyled, SwitchButtonStyled } from "./style";

import { useLanguage } from "@/shared/utils/language";

const DROPDOWN_POSITION: ElementPosition = ["center", "bottom"];

export type LanguageDropdownProps = {
    anchorRef: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const LanguageDropdown: FC<LanguageDropdownProps> = ({ anchorRef, onClose }) => {
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
                        fontSize="xs"
                        isStretched
                        onClick={handleClick}
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
            position={DROPDOWN_POSITION}
        >
            <ul>
                {items}
            </ul>
        </LanguageDropdownStyled>
    );
};
