import { type JestConfigWithTsJest } from "ts-jest";
import merge from "merge-deep";

import babelConfig from "../babel/babel.test";

import { baseJestConfig } from "./jest.base";
import { DEFAULT_ROOT_DIR } from "./const";

export const reactJestConfig = (rootDir = DEFAULT_ROOT_DIR): JestConfigWithTsJest =>
    merge(baseJestConfig(rootDir), {
        testEnvironment: "jsdom",
        transform: {
            "^.+\\.(jsx?|tsx?)$": [
                "ts-jest",
                {
                    babelConfig,
                    useESM: true,
                },
            ],
        },
    } satisfies JestConfigWithTsJest);
