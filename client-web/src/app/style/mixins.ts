import { css } from "styled-components";

import { BaseIconStyled } from "@/shared/components/icon/style";

const LAYOUT_ROW_INNER_PADDING_X = "3rem";
const TWO_LINES = 2;

export const mixins = {
    getLayoutRowInner: () => css`
        min-width: 10rem;
        max-width: 100rem;
        height: 100%;
        padding-right: ${LAYOUT_ROW_INNER_PADDING_X};
        padding-left: ${LAYOUT_ROW_INNER_PADDING_X};
        margin: 0 auto;
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
    getTwoLineText: (lineHeight: string) => css`
        display: -webkit-box;
        max-width: 100%;
        max-height: calc(${lineHeight} * ${TWO_LINES});
        line-height: ${lineHeight};
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
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
