import path from "path";

import { type JestConfigWithTsJest } from "ts-jest";

import { DEFAULT_ROOT_DIR } from "./const";
import { getDirName } from "./utils";

const dirName = getDirName();

export const baseJestConfig = (rootDir = DEFAULT_ROOT_DIR): JestConfigWithTsJest => ({
    clearMocks: true,
    collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
    maxWorkers: 2,
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": path.resolve(dirName, "mocks", "file-mock.js"),
    },
    rootDir,
    testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": path.resolve(dirName, "mocks", "file-mock.js"),
    },
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!(lodash-es|@popperjs|@eggziom)/)"],
    verbose: true,
});
