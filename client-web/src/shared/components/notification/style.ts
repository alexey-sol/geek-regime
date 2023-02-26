import styled, { css } from "styled-components";

import { TypographyStyled } from "@/shared/components/typography/style";
import { mixins } from "@/app/style/mixins";
import type { NotificationArg } from "@/features/feedback/models/entities";
import type { MapKeyToCss } from "@/shared/types/theme";

export type NotificationStyledProps = Pick<NotificationArg, "view">;

const MARGIN = "1rem";

const mapViewToCss: MapKeyToCss<NonNullable<NotificationStyledProps["view"]>> = {
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

export const NotificationStyled = styled.section<NotificationStyledProps>`
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

    ${TypographyStyled} {
        overflow-wrap: anywhere;
    }
`;
