import path from "path";

import webpack from "webpack";

import { getStyleRule } from "../webpack/utils/rules";

export default ({ config }: { config: webpack.Configuration }): webpack.Configuration => {
    config.resolve!.alias = {
        "@": path.resolve(__dirname, "..", "..", "src"),
    };

    config.module!.rules!.push(getStyleRule({ mode: "development", modules: true }));
    config.module!.rules!.push(getStyleRule({ mode: "development", modules: false }));

    return config;
};
