import { css } from "styled-components";
import { baseMixins } from "@eggziom/geek-regime-js-ui-kit";

const LAYOUT_ROW_INNER_PADDING_X = "3rem";

export const mixins = {
    ...baseMixins,
    getLayoutRowInner: () => css`
        min-width: 10rem;
        max-width: 100rem;
        height: 100%;
        padding-right: ${LAYOUT_ROW_INNER_PADDING_X};
        padding-left: ${LAYOUT_ROW_INNER_PADDING_X};
        margin: 0 auto;
    `,
} as const;
