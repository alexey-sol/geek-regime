module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "./node_modules/js-commons/configs/.eslintrc.base",
    ],
    globals: {
        JSX: true,
        NodeJS: true,
        React: true,
    },
    overrides: [
        {
            files: ["config/**", "*.stories.*", "**/views/**"],
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
    },
};
