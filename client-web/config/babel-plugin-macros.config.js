const isProduction = process.env.NODE_ENV === "production";

module.exports = {
    styledComponents: {
        fileName: false,
        displayName: !isProduction,
        minify: isProduction,
        transpileTemplateLiterals: isProduction,
    },
};
