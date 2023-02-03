import styled, { css } from "styled-components";

import { TypographyStyled } from "@/shared/components/typography/style";
import type { PopupArg } from "@/features/ui/models/entities";
import type { MapKeyToCss } from "@/shared/types/theme";

export type PopupStyledProps = Pick<PopupArg, "view">;

const MARGIN = "1rem";

const mapViewToCss: MapKeyToCss<NonNullable<PopupStyledProps["view"]>> = {
    failure: css(({ theme: { colors } }) => css`
        background-color: ${colors.red};
    `),
    success: css(({ theme: { colors } }) => css`
        background-color: ${colors.green};
    `),
    warning: css(({ theme: { colors } }) => css`
        background-color: ${colors.yellow};
    `),
};

export const PopupStyled = styled.section<PopupStyledProps>`
    position: absolute;
    z-index: ${({ theme }) => theme.zIndex.modal};
    top: ${MARGIN};
    right: ${MARGIN};
    display: flex;
    max-width: 100%;
    padding: 2rem;
    margin-left: ${MARGIN};
    margin-bottom: ${MARGIN};
    column-gap: 2rem;
    border-radius: 0.3rem;
    ${({ view = "success" }) => mapViewToCss[view]};

    ${TypographyStyled} {
        overflow-wrap: anywhere;
    }
`;
