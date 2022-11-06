import styled, {
    css,
    DefaultTheme,
    FlattenInterpolation,
    ThemeProps,
} from "styled-components";
import { BaseIconStyled } from "@/shared/components/icon/style";
import { Color } from "@/shared/types/theme";
import { BaseIconButtonStyledProps } from "./types";

const getFillCss = (fill: Color, fillOnHover: Color) => css`
    ${BaseIconStyled} {
        fill: ${fill};
    }

    &:hover {
        ${BaseIconStyled} {
            fill: ${fillOnHover};
        }
    }
`;

const mapVariationToCss: Record<
    NonNullable<BaseIconButtonStyledProps["variation"]>,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
> = {
    light: css`
        ${({ theme }) => getFillCss(theme.colors.white, theme.colors.orangeLighten)}};
    `,
    primary: css`
        ${({ theme }) => getFillCss(theme.colors.primary, theme.colors.secondary)}};
    `,
};

export const IconButtonStyled = styled.button<BaseIconButtonStyledProps>(
    ({ theme, variation = "primary" }) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        border: none;
        background-color: transparent;
        cursor: pointer;

        ${BaseIconStyled} {
            transition: fill ${theme.durations.normal} ease;
        }

        ${mapVariationToCss[variation]};
    `,
);
