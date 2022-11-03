import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { BaseDropdownStyledProps } from "@/shared/components/base-dropdown/types";

const mapVariationToCss: Record<
    NonNullable<BaseDropdownStyledProps["variation"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    plain: css`
        background-color: ${({ theme }) => theme.colors.white};
    `,
    primary: css`
        background-color: ${({ theme }) => theme.colors.primary};
    `,
};

export const BaseDropdownStyled = styled.section<BaseDropdownStyledProps>`
    position: absolute;
    z-index: ${({ theme }) => theme.components.overlay.zIndex + 1};
    border-radius: 0.3rem;
    outline: none;

    ${({ anchorRef, position = "bottom" }) => {
        const { current } = anchorRef ?? {};
        const topValue = current?.offsetHeight && (`${current.offsetHeight}px` || "100%");

        return (position === "bottom") && css`
            top: ${topValue};
            right: 0;
        `;
    }};

    ${({ variation = "plain" }) => mapVariationToCss[variation]};
`;
