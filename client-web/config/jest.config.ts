export default {
    bail: Infinity,
    clearMocks: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.{ts,tsx}",
        "!<rootDir>",
    ],
    globals: {
        "babel-jest": {
            babelrcFile: "babel.config.js",
        },
    },
    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
    },
    preset: "ts-jest/presets/js-with-ts",
    rootDir: "../",
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: "<rootDir>/tsconfig.json" }],
        // eslint-disable-next-line
        ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "<rootDir>/src/test/mocks/file-mock.js",
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/(?!(lodash-es|@popperjs)/)",
    ],
    verbose: true,
};
