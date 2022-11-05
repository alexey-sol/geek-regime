import styled, { css } from "styled-components";
import { BaseIconStyled } from "@/shared/components/icon/style";

export const IconButtonStyled = styled.button(
    ({ theme }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;

        ${BaseIconStyled} {
            fill: ${theme.colors.primary};
            transition: fill ${theme.durations.normal} ease;
        }

        &:hover {
            ${BaseIconStyled} {
                fill: ${theme.colors.secondary};
            }
        }
    `,
);
