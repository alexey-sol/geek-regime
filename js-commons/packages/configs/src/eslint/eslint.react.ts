module.exports = {
    env: {
        browser: true,
    },
    extends: [
        "airbnb",
        "airbnb/hooks",
        "./eslint.base",
    ],
    globals: {
        JSX: true,
        React: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        "react",
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
