import { libraryViteConfig } from "@eggziom/geek-regime-js-configs/vite";

import pkg from "../package.json";

const cwd = process.cwd();

export default libraryViteConfig(cwd, pkg.name);
