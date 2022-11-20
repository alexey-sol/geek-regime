import { css } from "styled-components";

const layoutRowInnerPaddingX = "3rem";
const lineHeight = 1.2;
const twoLines = 2;

export const mixins = {
    layoutRowInner: css`
        min-width: 10rem;
        max-width: 100rem;
        height: 100%;
        padding-right: ${layoutRowInnerPaddingX};
        padding-left: ${layoutRowInnerPaddingX};
        margin: 0 auto;
    `,
    oneLineText: css`
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `,
    twoLineText: css`
        display: -webkit-box;
        max-width: 100%;
        max-height: calc(${({ theme }) => theme.sizes.normal} * ${twoLines} * ${lineHeight});
        line-height: ${lineHeight};
        overflow: hidden;
        word-wrap: break-word;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    `,
} as const;
