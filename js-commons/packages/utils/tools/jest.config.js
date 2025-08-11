// FIXME eslint
const { baseJestConfig } = require("@eggziom/geek-regime-js-configs/jest");

const cwd = process.cwd();

module.exports = baseJestConfig(cwd);
