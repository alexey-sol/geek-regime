const purpleColor = "#655a7c";
const orangeColor = "#fc814a";

const headerMinHeight = "4rem";

export const theme = {
    breakpoints: {
        xs: "0",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
    },
    colors: {
        inherit: "inherit",
        primary: purpleColor,
        secondary: orangeColor,
        blue: "#afc1d6",
        greyDarkest: "#3a3238",
        greyDarken: "#4b5358",
        greyDark: "#727072",
        grey: "#96939b",
        greyLight: "#d1d1d1",
        greyLighten: "#e8e8e8",
        greyLightest: "#f8f8f8",
        greenDarken: "#5da196",
        greenDark: "#85c7bc",
        green: "#cef9f2",
        orangeDark: "#e25b30",
        orange: orangeColor,
        orangeLight: "#fccba4",
        orangeLighten: "#ffe7d4",
        purpleDark: "#453545",
        purpleDarker: "#372a37",
        purple: purpleColor,
        purpleLight: "#9078a2",
        purpleLighten: "#b1a0bd",
        red: "#fe4a49",
        redLight: "#fe9291",
        redLighten: "#fec8c8",
        white: "#ffffff",
        yellow: "lightyellow",
    },
    components: {
        footer: {
            paddingY: "2rem",
        },
        header: {
            minHeight: headerMinHeight,
        },
        main: {
            paddingY: "4rem",
        },
        navbar: {
            minHeight: headerMinHeight,
        },
    },
    durations: {
        fast: "50ms",
        normal: "100ms",
        slow: "150ms",
    },
    fonts: {
        inherit: "inherit",
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
    zIndex: {
        modal: 10,
        navbar: 9,
    },
} as const;
