import { mixins } from "@/shared/style/mixins";

const purpleColor = "#564256";
const orangeColor = "#fc814a";

export const theme = {
    colors: {
        inherit: "inherit",
        primary: purpleColor,
        secondary: orangeColor,
        greyDarkest: "#3a3238",
        greyDarken: "#4b5358",
        greyDark: "#727072",
        grey: "#96939b",
        greyLight: "#d1d1d1",
        greyLighten: "#e8e8e8",
        greyLightest: "#f8f8f8",
        orangeDark: "#e25b30",
        orange: orangeColor,
        orangeLight: "#fccba4",
        orangeLighten: "#ffe7d4",
        purple: purpleColor,
        purpleLight: "#856088",
        white: "#ffffff",
    },
    components: {
        header: {
            minHeight: "4rem",
        },
        main: {
            paddingY: "4rem",
        },
        navbar: {
            minHeight: "4rem",
        },
        overlay: {
            zIndex: 10,
        },
    },
    fonts: {
        logo: "Bree Serif, Helvetica, Arial, sans-serif",
        normal: "Roboto, Helvetica, Arial, sans-serif",
    },
    fontSizes: {
        inherit: "inherit",
        smallest: "1rem",
        smaller: "1.2rem",
        small: "1.4rem",
        normal: "1.6rem",
        large: "1.8rem",
        larger: "2rem",
        largest: "2.2rem",
    },
    mixins,
};
