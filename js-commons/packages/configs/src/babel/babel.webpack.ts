import { getStyledComponentsPlugin } from "./utils";

export default {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties"],
        getStyledComponentsPlugin(),
    ],
    presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
};
