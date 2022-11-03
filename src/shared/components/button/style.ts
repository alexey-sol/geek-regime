import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { Link } from "react-router-dom";
import { ButtonStyledProps } from "./types";

const mapVariationToCss: Record<
    ButtonStyledProps["variation"],
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    plain: css`
        border: 1px solid ${({ theme }) => theme.colors.primary};
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        transition: none;
        
        &:disabled {
            color: ${({ theme }) => theme.colors.primary};
        }

        &:not(:disabled):hover {
            border-color: ${({ theme }) => theme.colors.orangeDark};
            background-color: ${({ theme }) => theme.colors.orangeDark};
            color: ${({ theme }) => theme.colors.white};
        }
    `,
    primary: css`
        background-color: ${({ theme }) => theme.colors.primary};

        &:not(:disabled):hover {
            background-color: ${({ theme }) => theme.colors.purpleLight};
        }
    `,
    secondary: css`
        background-color: ${({ theme }) => theme.colors.secondary};

        &:not(:disabled):hover {
            background-color: ${({ theme }) => theme.colors.orangeDark};
        }
    `,
};

export const ButtonStyled = styled.button<ButtonStyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ isStretched }) => (isStretched ? "100%" : "auto")};
    padding: 1rem 2rem;
    border: none;
    border-radius: 0.3rem;
    user-select: none;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition: background-color 100ms ease;

    &:disabled {
        opacity: 0.5;
        color: ${({ theme }) => theme.colors.white};
        cursor: default;
    }

    ${({ variation }) => mapVariationToCss[variation]};
`;

export const LinkStyled = styled(Link)`
    display: inline-block;
    width: fit-content;
`;
