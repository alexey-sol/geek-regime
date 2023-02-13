import styled from "styled-components";

import { BaseDropdown } from "@/shared/components/base-dropdown";
import { Button } from "@/shared/components/button";

export const LanguageSwitchStyled = styled.section`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
`;

export const LanguageDropdownStyled = styled(BaseDropdown)`
    border-radius: 0 0 0.3rem 0.3rem;
    background-color: ${({ theme }) => theme.colors.primary};
`;

export const SwitchButtonStyled = styled(Button)`
    border-radius: 0;
    background-color: ${({ theme }) => theme.colors.primary};

    &:not(:disabled):hover {
        background-color: ${({ theme }) => theme.colors.purpleLight};
    }

    &:last-of-type {
        border-radius: 0 0 0.3rem 0.3rem;
    }
`;
