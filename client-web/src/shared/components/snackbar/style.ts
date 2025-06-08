import styled, { css } from "styled-components";
import { type MapKeyToCss, Typography } from "@eggziom/geek-regime-js-ui-kit";

import { mixins } from "@/app/style/mixins";
import type { SnackbarArg } from "@/features/feedback/models/entities";

export type SnackbarStyledProps = Pick<SnackbarArg, "view">;

const MARGIN = "1rem";

const mapViewToCss: MapKeyToCss<NonNullable<SnackbarStyledProps["view"]>> = {
    failure: css(({ theme: { colors } }) => css`
        background-color: ${colors.redLightest};
        border: 1px solid ${colors.redLighten};
        ${mixins.getIconFill(colors.redDarken)};

        ${Typography} {
            color: ${colors.redDarken};
        }
    `),
    success: css(({ theme: { colors } }) => css`
        background-color: ${colors.greenLightest};
        border: 1px solid ${colors.greenLighten};
        ${mixins.getIconFill(colors.greenDarken)};

        ${Typography} {
            color: ${colors.greenDarken};
        }
    `),
    warning: css(({ theme: { colors } }) => css`
        background-color: ${colors.orangeLighten};
        border: 1px solid ${colors.orangeLight};
        ${mixins.getIconFill(colors.orangeDarken)};

        ${Typography} {
            color: ${colors.orangeDarken};
        }
    `),
};

export const SnackbarStyled = styled.section<SnackbarStyledProps>`
    position: fixed;
    z-index: ${({ theme }) => theme.zIndex.modal};
    top: ${MARGIN};
    right: ${MARGIN};
    display: flex;
    align-items: center;
    max-width: 100%;
    padding: 1rem 2rem;
    margin-left: ${MARGIN};
    margin-bottom: ${MARGIN};
    column-gap: 2rem;
    border-radius: 0.3rem;
    ${({ view = "success" }) => mapViewToCss[view]};

    ${Typography} {
        overflow-wrap: anywhere;
    }
`;
