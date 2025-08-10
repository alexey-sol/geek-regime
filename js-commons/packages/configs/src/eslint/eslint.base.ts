module.exports = {
    env: {
        es2021: true,
        jest: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base",
    ],
    globals: {
        NodeJS: true,
    },
    overrides: [
        {
            files: ["*.spec.*", "*.test.*", "*-test.*"],
            env: {
                jest: true,
            },
            rules: {
                "@typescript-eslint/no-empty-function": "off",
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
        "@typescript-eslint/consistent-type-imports": ["error", {
            fixStyle: "inline-type-imports",
        }],
        "@typescript-eslint/member-delimiter-style": "warn",
        "@typescript-eslint/no-shadow": ["error"],
        "@typescript-eslint/no-empty-function": "error",
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "@typescript-eslint/no-redeclare": "error",
        "@typescript-eslint/no-unused-vars": ["error", {
            args: "after-used",
            ignoreRestSiblings: true,
            varsIgnorePattern: "^_",
        }],
        "@typescript-eslint/no-useless-constructor": "error",
        "@typescript-eslint/semi": "warn",
        "class-methods-use-this": "off",
        "implicit-arrow-linebreak": "off",
        "import/extensions": "off",
        "import/newline-after-import": "warn",
        "import/no-extraneous-dependencies": "off",
        "import/no-unresolved": "off", // [1]
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
            code: 120,
            ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
            ignoreUrls: true,
        }],
        "no-console": ["error", {
            allow: ["warn", "error"],
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
        "no-undef": "off",
        "no-unused-vars": "off",
        "no-useless-constructor": "off",
        quotes: ["error", "double"],
        semi: "off",
        "unicorn/filename-case": ["error", {
            case: "kebabCase",
        }],
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
};

// [1]. TS and build tools will tackle this issue instead of eslint.
