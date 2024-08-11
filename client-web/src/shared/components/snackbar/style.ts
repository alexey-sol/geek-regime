import styled, { css } from "styled-components";
import { type MapKeyToCss, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { mixins } from "@/app/style/mixins";
import type { SnackbarArg } from "@/features/feedback/models/entities";

export type SnackbarStyledProps = Pick<SnackbarArg, "view">;

const MARGIN = "1rem";

const mapViewToCss: MapKeyToCss<NonNullable<SnackbarStyledProps["view"]>> = {
    failure: css(({ theme: { colors } }) => css`
        background-color: ${colors.redLighten};
        border: 1px solid ${colors.redLight};
        ${mixins.getIconFill(colors.red)};
    `),
    success: css(({ theme: { colors } }) => css`
        background-color: ${colors.green};
        border: 1px solid ${colors.greenDark};
        ${mixins.getIconFill(colors.greenDarken)};
    `),
    warning: css(({ theme: { colors } }) => css`
        background-color: ${colors.orangeLighten};
        border: 1px solid ${colors.orangeLight};
        ${mixins.getIconFill(colors.orange)};
    `),
};

export const SnackbarStyled = styled.section<SnackbarStyledProps>`
    position: fixed;
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

    ${Typography} {
        overflow-wrap: anywhere;
    }
`;
