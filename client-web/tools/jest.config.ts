import { reactJestConfig } from "@eggziom/geek-regime-js-configs/jest";
import merge from "webpack-merge";

const cwd = process.cwd();

export default merge(reactJestConfig(cwd), {
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
});
