import styled, { css } from "styled-components";
import { Button } from "@/shared/components/button";

const gap = "0.5rem";

export const PagingStyled = styled.nav`
    display: flex;
    width: fit-content;
    flex-direction: column;
    align-self: center;
    row-gap: ${gap};
`;

export const PagingButtonStyled = styled(Button)<{ active?: boolean }>(
    ({ active, theme }) => css`
        display: flex;
        min-width: 4rem;
        min-height: 4rem;
        padding: 0;
        color: ${theme.colors.greyDarkest};

        ${active && css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.primary};
        `};

        ${!active && css`
            border: 1px solid ${theme.colors.greyLight};
            background-color: transparent;
        `};

        &:hover {
            border-color: transparent;
            color: ${theme.colors.white};
        }

        &:disabled {
            color: ${theme.colors.primary};
        }
    `,
);

export const LeapButtonsWrapStyled = styled.ul`
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0 0 ${gap} 0;
    justify-content: space-between;
`;

export const LeapButtonStyled = styled(Button)`
    text-decoration-style: dotted;
`;

export const StepButtonsWrapStyled = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${gap};
`;

export const StepButtonStyled = styled(PagingButtonStyled)`
    border: none;
`;

export const PageNumbersWrapStyled = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: ${gap};
`;

export const SpillStyled = styled(PagingButtonStyled)`
    pointer-events: none;
    border-color: transparent;

    &:before {
        content: "\\2026";
    }
`;
