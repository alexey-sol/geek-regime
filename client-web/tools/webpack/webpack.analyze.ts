import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import productionConfig from "./webpack.production";

export default merge(productionConfig({}, { mode: "production" }), {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
});
