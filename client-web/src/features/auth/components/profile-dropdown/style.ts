import styled from "styled-components";
import { BaseDropdown, LinkButton, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { mixins } from "@/app/style/mixins";

export const ProfileDropdownStyled = styled(BaseDropdown)`
    padding: 1rem;
    border-radius: 0 0 0.3rem 0.3rem;
    background-color: ${({ theme }) => theme.colors.white};
    ${mixins.getWrapShadow()};
`;

export const ProfileListStyled = styled.ul`
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    li {
        display: flex;
        justify-content: end;
    }
`;

export const ProfileButtonStyled = styled(LinkButton)`
    ${Typography} {
        text-decoration: none;
        white-space: nowrap;
        color: ${({ theme }) => theme.colors.greyDarken};
    }
`;
