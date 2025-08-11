import path from "path";

import { merge } from "webpack-merge";
import { type CallableOption } from "webpack-cli";
import { productionWebpackConfig } from "@eggziom/geek-regime-js-configs/webpack";

import baseWebpackConfig from "./webpack.base";

const config: CallableOption = (env, argv) => {
    const baseProductionConfig = merge(baseWebpackConfig(env, argv), productionWebpackConfig);

    return merge(baseProductionConfig, {
        optimization: {
            splitChunks: {
                chunks: "all",
                maxInitialRequests: Infinity,
                cacheGroups: {
                    formsVendor: {
                        test: /[\\/]node_modules[\\/](formik)[\\/]/,
                        filename: path.join("js", "libs", "vendor.forms.js"),
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/](?!formik)(.[a-zA-Z0-9.\-_]+)[\\/]/,
                    },
                },
            },
        },
    });
};

export default config;
