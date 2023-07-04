module.exports = {
    plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties"],
        "babel-plugin-styled-components",
    ],
    presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"],
};
