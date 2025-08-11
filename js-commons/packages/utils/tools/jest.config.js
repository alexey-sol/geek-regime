// eslint-disable-next-line @typescript-eslint/no-var-requires
const { baseJestConfig } = require("@eggziom/geek-regime-js-configs/jest");

const cwd = process.cwd();

module.exports = baseJestConfig(cwd);
