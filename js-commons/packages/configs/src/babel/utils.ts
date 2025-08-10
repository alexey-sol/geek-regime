const isProduction = process.env.NODE_ENV === "production";

export const getStyledComponentsPlugin = () =>
    ["babel-plugin-styled-components", {
        displayName: true,
        fileName: false,
        minify: isProduction,
    }] as const;
