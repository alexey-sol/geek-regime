import path from "node:path";

import { libInjectCss } from "vite-plugin-lib-inject-css";
import { defineConfig, type UserConfig } from "vite";
import reactPlugin from "@vitejs/plugin-react";
import dtsPlugin from "vite-plugin-dts";
import { globSync } from "glob";

import babelViteConfig from "../babel/babel.vite";

const EXCLUDE_FILES = [
    "src/**/*.d.ts",
    "src/**/*.mdx",
    "src/**/*.stories.*",
    "src/**/*.test.*",
    "src/test/setup.*",
    "tools",
];

const EXTERNAL_DEPENDENCIES = [
    // [1]
    "react",
    "react/jsx-runtime",
    "react-dom",
    "react-router-dom",
    "styled-components",
];

const isExternal = (id: string) => EXTERNAL_DEPENDENCIES.includes(id);

export const libraryViteConfig = (rootDir: string, libraryName?: string): UserConfig =>
    defineConfig({
        plugins: [
            reactPlugin({
                babel: babelViteConfig,
            }),
            dtsPlugin({
                exclude: EXCLUDE_FILES,
            }),
            libInjectCss(),
        ],
        build: {
            lib: {
                entry: path.resolve(rootDir, "src", "index.ts"),
                formats: ["es"],
                name: libraryName,
            },
            rollupOptions: {
                external: isExternal,
                input: Object.fromEntries(
                    globSync("src/**/*.{ts,tsx}", {
                        ignore: EXCLUDE_FILES,
                    }).map((file) => [
                        path.relative("src", file.slice(0, file.length - path.extname(file).length)),
                        path.resolve(rootDir, file),
                    ]),
                ),
                output: {
                    dir: "dist",
                    globals: {
                        react: "React",
                        "react-dom": "ReactDOM",
                    },
                    inlineDynamicImports: false,
                    assetFileNames: "styles/[name][extname]",
                    entryFileNames: "[name].js",
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(rootDir, "src"),
            },
        },
    });

// [1]. If a dependency utilizes a context, and you want to share the context of your app, you need to
// specify that dependency here, otherwise it will create a new context inside the library.
// Had this issue with react-hook-form and its useFormContext.
