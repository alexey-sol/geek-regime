module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
    ],
    globals: {
        JSX: true,
        NodeJS: true,
        React: true,
    },
    ignorePatterns: ["build/*", "coverage/*", "dist/*", "node_modules/*"],
    overrides: [
        {
            files: ["config/**", "*.stories.*"],
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
        "@typescript-eslint",
        "react",
        "unicorn",
    ],
    rules: {
        "@typescript-eslint/member-delimiter-style": "warn",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/semi": "warn",
        "class-methods-use-this": "off",
        "implicit-arrow-linebreak": "off",
        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            jsx: "never",
            ts: "never",
            tsx: "never",
        }],
        "import/first": ["warn", "absolute-first"],
        "import/newline-after-import": "warn",
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],
        "import/no-default-export": "error",
        "import/order": ["warn", {
            groups: [
                "builtin", "external", "internal", "parent", "sibling", "index",
            ],
            "newlines-between": "always",
        }],
        "import/prefer-default-export": "off",
        indent: ["error", 4, {
            SwitchCase: 1,
            ignoredNodes: ["PropertyDefinition"],
        }],
        "linebreak-style": ["error", "unix"],
        "lines-between-class-members": ["error", "always", {
            exceptAfterSingleLine: true,
        }],
        "max-classes-per-file": "off",
        "max-len": ["error", {
            code: 100,
        }],
        "no-else-return": ["error", {
            allowElseIf: true,
        }],
        "no-empty-function": "off",
        "no-param-reassign": ["error", {
            props: false,
        }],
        "no-redeclare": "off",
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
        "react/require-default-props": "off",
        "react/state-in-constructor": "off",
        semi: "off",
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
                extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
                map: [
                    ["@", "./src"],
                ],
            },
        },
    },
};
