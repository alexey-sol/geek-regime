

// export default { // TODO extend ...
//     bail: Infinity,
//     clearMocks: true,
//     collectCoverageFrom: [
//         "<rootDir>/src/**/*.{ts,tsx}",
//         "!<rootDir>",
//     ],
//     globals: {
//         "babel-jest": {
//             babelrcFile: "babel.config.js",
//         },
//     },
//     moduleNameMapper: {
//         "^@/(.*)": "<rootDir>/src/$1",
//     },
//     preset: "ts-jest/presets/js-with-ts",
//     rootDir: "../",
//     setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
//     testEnvironment: "jsdom",
//     testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
//     transform: {
//         "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
//         // eslint-disable-next-line
//         ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/src/test/mocks/file-mock.js",
//     },
//     transformIgnorePatterns: [
//         "<rootDir>/node_modules/(?!(lodash-es|@popperjs)/)",
//     ],
//     verbose: true,
// };


import merge from "webpack-merge";
import type { JestConfigWithTsJest } from "ts-jest";

import reactConfig from "@eggziom/geek-regime-js-ui-kit/dist/configs/jest/config.react";
import { getTransformOptions } from "@eggziom/geek-regime-js-ui-kit/dist/configs/jest/utils";
// import {getTransformOptions} from "../src/configs/jest/utils";

const config: JestConfigWithTsJest = {
// const config: JestConfigWithTsJest = merge<JestConfigWithTsJest>(reactConfig, {
    ...reactConfig,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        // "^@test/(.*)$": "<rootDir>/src/test/$1",
    },
    rootDir: "../",
    // setupFiles: ["core-js"],
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
    transform: getTransformOptions({ // TODO remove after publishing ui-kit
        babelConfig: "./node_modules/@eggziom/geek-regime-js-ui-kit/dist/configs/babel/babel.base.js"
    })
    // testEnvironment: "jsdom",
    // transform: getTransformOptions({
    //     babelConfig: "./src/configs/babel/babel.base.js",
    //     fileMock: "./src/configs/jest/mocks/file-mock.js",
    // }),
    // transform: getTransformOptions({
    //     babelConfig: "./src/configs/babel/babel.base.js",
    //     // fileMock: "./src/configs/jest/mocks/file-mock.js",
    // }),
};

export default config;
