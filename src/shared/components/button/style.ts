import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { ButtonStyledProps } from "./types";

const mapVariationToCss: Record<
    ButtonStyledProps["variation"],
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    dark: css`
        border: 1px solid ${({ theme }) => theme.colors.tertiary};
        background-color: ${({ theme }) => theme.colors.tertiary};

        &:not(:disabled):hover {
            background-color: #ce746e;
        }
    `,
    light: css`
        border: 1px solid ${({ theme }) => theme.colors.quaternary};
        background-color: ${({ theme }) => theme.colors.primary};

        &:not(:disabled):hover {
            background-color: #ffdc9a;
        }
    `,
    transparent: css`
        border: 1px solid ${({ theme }) => theme.colors.quaternary};
        background-color: transparent;

        &:not(:disabled):hover {
            background-color: #ffdc9a;
        }
    `,
};

export const ButtonStyled = styled.button<ButtonStyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ isStretched }) => (isStretched ? "100%" : "auto")};
    padding: 1rem 3rem;
    user-select: none;
    transition: background-color 100ms ease;
    cursor: pointer;
    ${({ variation }) => mapVariationToCss[variation]}

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;
