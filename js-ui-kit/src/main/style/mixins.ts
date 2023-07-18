import { css } from "styled-components";

import { BaseIconStyled } from "@/components/icon";
import type { ColorValue } from "@/types/theme";

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
    getLinkDecoration: () => css(
        ({ theme }) => css`
            color: ${theme.colors.secondary};
            text-decoration: underline dashed;
            text-underline-offset: 0.2rem;
            transition:
                color ${theme.durations.fast} ease,
                fill ${theme.durations.fast} ease;

            ${BaseIconStyled} {
                fill: ${theme.colors.secondary};
            };

            &:disabled {
                color: ${theme.colors.secondary};
            }

            &:not(:disabled):hover {
                color: ${theme.colors.orangeDark};

                ${BaseIconStyled} {
                    fill: ${theme.colors.orangeDark};
                };
            }
        `,
    ),
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
        font-size: ${({ theme }) => theme.fontSizes.smaller};
    `,
    getWrapShadow: () => css`
        box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
    `,
} as const;
