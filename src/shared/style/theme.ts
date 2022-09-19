import { mixins } from "@/shared/style/mixins";

const greyDarkestColor = "#232323";

export const theme = {
    colors: {
        primary: "orange",
        secondary: "cadetblue",
        tertiary: "lightgray",
        greyDarkest: greyDarkestColor,
        greyDarken: "#636363",
        greyDark: "#818181",
        grey: "#bcbcbc",
        greyLight: "#d1d1d1",
        greyLighten: "#f6f6f6",
        greyLightest: "#f8f8f8",
        orange: "#ffd275",
        pink: "#be6361",
        white: "#ffffff",
    },
    components: {
        header: {
            // height: "4rem",
        },
    },
    fonts: {
        normal: "Roboto, Helvetica, Arial, sans-serif",
    },
    fontColors: {
        normal: greyDarkestColor,
    },
    fontSizes: {
        small: "1.4rem",
        normal: "1.6rem",
        large: "1.8rem",
        larger: "2rem",
    },
    mixins,
};
