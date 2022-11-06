import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { BaseDropdownStyledProps } from "./types";

const mapPositionToCss: Record<
    NonNullable<BaseDropdownStyledProps["position"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    "bottom-center": css`
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
    `,
    "bottom-right": css`
        top: 100%;
        right: 0;
    `,
};

export const BaseDropdownStyled = styled.section<BaseDropdownStyledProps>`
    ${({
        theme,
        position = "bottom-right",
    }) => css`
        position: absolute;
        z-index: ${theme.components.overlay.zIndex + 1};
        width: fit-content;
        border-radius: 0.3rem;
        outline: none;
        ${mapPositionToCss[position]}};
    `};
`;
