import { mixins } from "@/shared/style/mixins";

const greyDarkestColor = "#232323";
const whiteColor = "#ffffff";

export const theme = {
    colors: {
        primary: "#ffd275",
        secondary: "#87666c",
        tertiary: "#be6361",
        quaternary: "#663939",
        greyDarkest: greyDarkestColor,
        greyDarken: "#636363",
        greyDark: "#818181",
        grey: "#bcbcbc",
        greyLight: "#d1d1d1",
        greyLighten: "#f6f6f6",
        greyLightest: "#f8f8f8",
        orange: "#ffd275",
        pink: "#be6361",
        white: whiteColor,
    },
    components: {
        header: {
            // height: "4rem",
        },
        overlay: {
            zIndex: 10,
        },
    },
    fonts: {
        normal: "Roboto, Helvetica, Arial, sans-serif",
    },
    fontColors: {
        normal: greyDarkestColor,
        white: whiteColor,
    },
    fontSizes: {
        small: "1.4rem",
        normal: "1.6rem",
        large: "1.8rem",
        larger: "2rem",
    },
    mixins,
};
