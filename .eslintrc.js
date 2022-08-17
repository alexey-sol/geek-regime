module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        "airbnb-base",
    ],
    overrides: [
        {
            files: ["**/*.test.ts", "**/*-test.ts"],
            env: {
                jest: true,
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
        "unicorn",
    ],
    rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-unused-vars": "error",
        "class-methods-use-this": "off",
        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            ts: "never",
        }],
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],
        "import/no-default-export": "error",
        "import/prefer-default-export": "off",
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        "lines-between-class-members": ["error", "always", {
            exceptAfterSingleLine: true,
        }],
        "max-len": ["error", {
            code: 100,
        }],
        "no-console": "off",
        "no-empty-function": ["error", {
            allow: ["constructors"],
        }],
        "no-param-reassign": ["error", {
            props: false,
        }],
        "no-restricted-exports": ["error", {
            restrictedNamedExports: [],
        }],
        "no-shadow": "off",
        "no-unused-vars": ["error", {
            args: "none",
        }],
        "no-useless-constructor": "off",
        quotes: ["error", "double"],
        "unicorn/filename-case": ["error", {
            case: "kebabCase",
        }],
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".ts"],
            },
            alias: {
                extensions: [".ts", ".js", ".json"],
                map: [
                    ["@", "./src"],
                ],
            },
        },
    },
};
