import * as esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

await esbuild.build({
    bundle: true,
    entryPoints: ["src/index.ts"],
    format: "cjs",
    minify: true,
    outfile: "dist/index.js",
    platform: "node",
    plugins: [nodeExternalsPlugin()],
    target: "node14",
    treeShaking: true,
});
