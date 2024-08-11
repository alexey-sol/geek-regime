import { css } from "styled-components";

import { BaseIconStyled } from "@/components/icon";
import { type ColorValue } from "@/types/theme";

import { getLinkDecoration } from "./link-decoration";

export const baseMixins = {
    getIconFill: (fill: ColorValue, fillOnHover = fill) => css`
        ${BaseIconStyled} {
            fill: ${fill};
        }

        &:hover {
            ${BaseIconStyled} {
                fill: ${fillOnHover};
            }
        }
    `,
    getLinkDecoration,
    getOneLineText: () => css`
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `,
    getLineClampText: (lineCount: number, lineHeight: string) => css`
        display: -webkit-box;
        max-width: 100%;
        max-height: calc(${lineHeight} * ${lineCount});
        line-height: ${lineHeight};
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-line-clamp: ${lineCount};
        -webkit-box-orient: vertical;
    `,
    getShrinkLabel: () => css`
        position: absolute;
        top: -1.4rem;
        color: ${({ theme }) => theme.colors.grey};
        font-size: ${({ theme }) => theme.fontSizes.xs};
    `,
    getWrapShadow: () => css`
        box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
    `,
} as const;
