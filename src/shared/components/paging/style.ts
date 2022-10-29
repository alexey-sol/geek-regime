import styled, { css } from "styled-components";
import { TypographyStyled } from "@/shared/components/typography/style";

const disabledButtonOpacity = 0.3;

export const PagingStyled = styled.nav`
    display: flex;
    width: fit-content;
    flex-direction: column;
    align-self: center;
    row-gap: 0.5rem;
`;

export const PagingButtonStyled = styled.button<{ active?: boolean }>(
    ({ active, theme }) => css`
        display: flex;
        min-width: 4rem;
        min-height: 4rem;
        border: 1px solid ${active ? "transparent" : theme.colors.greyLight};
        border-radius: 0.4rem;
        justify-content: center;
        align-items: center;
        background-color: ${active ? theme.colors.pink : "transparent"};
        user-select: none;
        cursor: pointer;
        transition: border-color 100ms ease, color 120ms ease;
      
        ${TypographyStyled} {
            color: ${active && theme.colors.white};
        }

        &:hover {
            border-color: transparent;
            background-color: ${theme.colors.orange};
    
            ${TypographyStyled} {
                color: ${theme.colors.white};
            }
        }

        &:disabled {
            pointer-events: none;
            opacity: ${disabledButtonOpacity};
        }
    `,
);

export const LeapButtonsWrapStyled = styled.ul`
    display: flex;
    width: 100%;
    padding: 0;
    margin: 0 0 0.5rem 0;
    justify-content: space-between;
`;

export const LeapButtonStyled = styled.button`
    border: 0;
    padding: 0;
    background-color: transparent;
    user-select: none;
    cursor: pointer;
    transition: opacity 100ms ease;

    &:hover {
        opacity: 0.6;
    }

    &:disabled {
        pointer-events: none;
        opacity: ${disabledButtonOpacity};
    }
`;

export const StepButtonsWrapStyled = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StepButtonStyled = styled(PagingButtonStyled)`
    border: 0;
`;

export const PageNumbersWrapStyled = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
`;
