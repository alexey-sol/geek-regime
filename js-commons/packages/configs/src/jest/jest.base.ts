import { type JestConfigWithTsJest } from "ts-jest";

import { DEFAULT_ROOT_DIR } from "./const";

const FILE_MOCK_PATH = "<rootDir>/node_modules/@eggziom/geek-regime-js-configs/dist/cjs/jest/mocks/file-mock.js";

export const baseJestConfig = (rootDir = DEFAULT_ROOT_DIR): JestConfigWithTsJest => ({
    clearMocks: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!**/*.d.ts",
        "!**/node_modules/**",
    ],
    maxWorkers: 2,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": FILE_MOCK_PATH,
    },
    rootDir,
    testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": FILE_MOCK_PATH,
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!(lodash-es|@popperjs|@eggziom)/)",
    ],
    verbose: true,
});
