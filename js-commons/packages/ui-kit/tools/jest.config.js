import { reactJestConfig } from "@eggziom/geek-regime-js-configs/jest";
import merge from "merge-deep";

const cwd = process.cwd();

export default merge(reactJestConfig(cwd), {
    setupFilesAfterEnv: ["<rootDir>/src/test/setup.tsx"],
});
