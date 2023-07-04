type Option =
    | "BABEL_CONFIG"
    | "FILE_MOCK";

type ModuleNameMapperOptions = Record<Extract<Option, "FILE_MOCK">, string>;

type TransformOptions = Record<Extract<Option, "FILE_MOCK" | "BABEL_CONFIG">, string>;

const defaults: TransformOptions = {
    BABEL_CONFIG: "./node_modules/@eggziom/geek-regime-js-configs/dist/babel/config.base.js",
    FILE_MOCK: "<rootDir>/node_modules/@eggziom/geek-regime-js-configs/dist/jest/mocks/file-mock.js",
};

export const moduleNameMapperOptions: Record<string, ModuleNameMapperOptions> = {
    regExps: {
        FILE_MOCK: ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$",
    },
    defaults: {
        FILE_MOCK: defaults.FILE_MOCK,
    },
};

export const transformOptions: Record<string, TransformOptions> = {
    regExps: {
        BABEL_CONFIG: "^.+\\.(t|j)sx?$",
        FILE_MOCK: ".+\\.(svg|css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$",
    },
    defaults: {
        BABEL_CONFIG: defaults.BABEL_CONFIG,
        FILE_MOCK: defaults.FILE_MOCK,
    },
};
