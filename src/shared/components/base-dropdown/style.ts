import styled, { css } from "styled-components";

import { MapKeyToCss } from "@/shared/types/theme";

import { BaseDropdownStyledProps } from "./types";

const mapPositionToCss: MapKeyToCss<NonNullable<BaseDropdownStyledProps["position"]>> = {
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
        z-index: ${theme.zIndex.modal};
        width: fit-content;
        border-radius: 0.3rem;
        outline: none;
        ${mapPositionToCss[position]}};
    `};
`;
