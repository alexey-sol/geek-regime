import styled, { css } from "styled-components";

import { mixins } from "@/app/style/mixins";

export const InputWrapStyled = styled.section`
    position: relative;
    margin: 3rem 0;
`;

export const LabelStyled = styled.span<{ hasValue?: boolean }>(
    ({ theme, hasValue = false }) => css`
        position: absolute;
        top: 1rem;
        left: 0.5rem;
        pointer-events: none;
        color: ${theme.colors.greyDarken};
        font-family: ${theme.fonts.normal};
        font-size: ${theme.fontSizes.small};
        transition: ${theme.durations.slow} ease;
        ${hasValue && mixins.getShrinkLabel()};
    `,
);

export const InputStyled = styled.input(
    ({ theme }) => css`
        box-sizing: border-box;
        display: block;
        width: 100%;
        padding: 1rem 1rem 1rem 0.5rem;
        border: none;
        border-bottom: 1px solid ${theme.colors.greyDarken};
        outline: none;
        background-color: ${theme.colors.white};
        color: ${theme.colors.greyDarken};
        font-family: ${theme.fonts.normal};
        font-size: ${theme.fontSizes.normal};

        &:-webkit-autofill {
            & + ${LabelStyled} {
                ${mixins.getShrinkLabel()};
            }
        }

        &:disabled {
            pointer-events: none;
            opacity: 0.5;
            cursor: default;
        }
    `,
);

export const HintStyled = styled.span(
    ({ theme }) => css`
        position: absolute;
        padding-top: 0.5rem;
        color: red; // TODO color
        font-family: ${theme.fonts.normal};
        font-size: ${theme.fontSizes.small};
    `,
);
