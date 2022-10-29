import { mixins } from "@/shared/style/mixins";

const greyDarkenColor = "#757575";
const greyDarkestColor = "#232323";
const whiteColor = "#ffffff";

export const theme = {
    colors: {
        primary: "#ffd275",
        secondary: "#87666c",
        tertiary: "#be6361",
        quaternary: "#663939",
        greyDarkest: greyDarkestColor,
        greyDarken: greyDarkenColor,
        greyDark: "#939393",
        grey: "#bcbcbc",
        greyLight: "#d1d1d1",
        greyLighten: "#e7e7e7",
        greyLightest: "#f8f8f8",
        orange: "#ffd275",
        pink: "#be6361",
        white: whiteColor,
    },
    components: {
        header: {
            // height: "4rem",
        },
        main: {
            paddingY: "4rem",
        },
        overlay: {
            zIndex: 10,
        },
    },
    fonts: {
        normal: "Roboto, Helvetica, Arial, sans-serif",
    },
    fontColors: {
        grey: greyDarkenColor,
        normal: greyDarkestColor,
        white: whiteColor,
    },
    fontSizes: {
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
