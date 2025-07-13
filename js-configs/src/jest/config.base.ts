import type { JestConfigWithTsJest } from "ts-jest";

import {moduleNameMapperOptions, transformOptions} from "./utils";

const config: JestConfigWithTsJest = {
    bail: Infinity,
    clearMocks: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!<rootDir>/src/configs/**",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    moduleNameMapper: {
        [moduleNameMapperOptions.regExps.FILE_MOCK]: moduleNameMapperOptions.defaults.FILE_MOCK
    },
    preset: "ts-jest/presets/js-with-ts",
    rootDir: "./",
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
    testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        [transformOptions.regExps.FILE_MOCK]: transformOptions.defaults.FILE_MOCK,
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!(lodash-es|@popperjs|@eggziom)/)",
    ],
    verbose: true,
};

export default config;
