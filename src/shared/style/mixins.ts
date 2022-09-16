import { css } from "styled-components";

export const mixins = {
    gridLayout: css`
        display: grid;
        width: 100%;
        grid-template-columns: repeat(12, 1fr);
        gap: 3rem;
    `,
    gridLayoutInner: css`
        grid-column: 4 / span 6;
        max-width: 120rem;

        @media (max-width: 1200px) {
            grid-column: 2 / span 10;
        }

        @media (max-width: 1500px) {
            grid-column: 3 / span 8;
        }

        @media (min-width: 2500px) {
            grid-column: 5 / span 4;
        }

        @media (min-width: 3500px) {
            grid-column: 6 / span 3;
        }
    `,
};
