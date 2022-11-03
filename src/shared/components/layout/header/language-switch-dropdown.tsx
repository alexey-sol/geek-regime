import React from "react";
import { BaseDropdown } from "@/shared/components/base-dropdown";
import { useLanguage } from "@/shared/utils/language";
import styled from "styled-components";
import { Button } from "@/shared/components/button";
import { getFilteredLanguages, getLanguageTitle } from "./utils";

// TODO reorganize
export const BaseDropdownStyled = styled(BaseDropdown)`
    border-radius: 0 0 0.3rem 0.3rem ;
`;

export const ListStyled = styled.ul`
    padding: 0 0.5rem 0.5rem;
`;

export const ButtonStyled = styled(Button)`
    color: ${({ theme }) => theme.colors.white};
`;

export type LanguageSwitchDropdownProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const LanguageSwitchDropdown = ({ anchorRef, onClose }: LanguageSwitchDropdownProps) => {
    const { language, setLanguage } = useLanguage();

    const items = getFilteredLanguages(language)
        .map((lang) => {
            const handleClick = () => {
                setLanguage(lang).catch(console.error);
                onClose();
            };

            return (
                <li key={lang} onClick={handleClick}>
                    <ButtonStyled variation="plain">
                        {getLanguageTitle(lang)}
                    </ButtonStyled>
                </li>
            );
        });

    return (
        <BaseDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            variation="primary"
        >
            <ListStyled>
                {items}
            </ListStyled>
        </BaseDropdownStyled>
    );
};
