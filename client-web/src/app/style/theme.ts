import { baseTheme } from "@eggziom/geek-regime-js-ui-kit/style";

const headerMinHeight = "4rem";

export const theme = {
    ...baseTheme,
    components: {
        footer: {
            paddingY: "2rem",
        },
        header: {
            minHeight: headerMinHeight,
        },
        main: {
            paddingY: "2rem",
        },
        navbar: {
            minHeight: headerMinHeight,
        },
    },
    colors: {
        ...baseTheme.colors,
    },
};
