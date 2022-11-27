import { css } from "styled-components";

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
} as const;
