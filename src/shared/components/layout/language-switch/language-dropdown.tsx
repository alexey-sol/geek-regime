import React from "react";
import { BaseDropdown } from "@/shared/components/base-dropdown";
import { useLanguage } from "@/shared/utils/language";
import styled from "styled-components";
import { SwitchButton } from "./switch-button";
import { getFilteredLanguages, getLanguageTitle } from "./utils";

export const LanguageDropdownStyled = styled(BaseDropdown)`
    left: 0;
    right: 0;
    border-radius: 0 0 0.3rem 0.3rem;
`;

export const ListStyled = styled.ul`
    padding: 0 0 0.4rem;
`;

export const SwitchButtonStyled = styled(SwitchButton)`
    min-height: ${({ theme }) => theme.components.header.minHeight};
`;

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
                    <SwitchButtonStyled onClick={handleClick}>
                        {getLanguageTitle(lang)}
                    </SwitchButtonStyled>
                </li>
            );
        });

    return (
        <LanguageDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            variation="primary"
        >
            <ListStyled>
                {items}
            </ListStyled>
        </LanguageDropdownStyled>
    );
};
