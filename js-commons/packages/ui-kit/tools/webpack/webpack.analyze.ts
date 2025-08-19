import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import productionConfig from "./webpack.production";

/** Deprecated. Use Vite instead to build the library. */
export default merge(productionConfig({}, { mode: "production" }), {
    plugins: [new BundleAnalyzerPlugin()],
});
