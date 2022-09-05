module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
    ],
    globals: {
        JSX: true,
        React: true,
    },
    overrides: [
        {
            files: ["webpack.*.ts", "src/features/**/views/*"],
            rules: {
                "import/no-default-export": "off",
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "unicorn",
    ],
    rules: {
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "implicit-arrow-linebreak": "off",
        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
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
        "no-empty-function": "off",
        "no-param-reassign": ["error", {
            props: false,
        }],
        "no-restricted-exports": ["error", {
            restrictedNamedExports: [],
        }],
        "no-shadow": "off",
        "no-unused-vars": "off",
        "no-useless-constructor": "off",
        quotes: ["error", "double"],
        "react/function-component-definition": ["error", {
            namedComponents: "arrow-function",
            unnamedComponents: "arrow-function",
        }],
        "react/jsx-filename-extension": ["warn", {
            extensions: [".tsx", ".ts"],
        }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-props-no-spreading": "off",
        "react/prop-types": "off",
        "unicorn/filename-case": ["error", {
            case: "kebabCase",
        }],
    },
    settings: {
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            alias: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
                map: [
                    ["@", "./src"],
                ],
            },
        },
    },
};
