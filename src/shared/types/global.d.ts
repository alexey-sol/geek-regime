import { theme } from "@/app/style/theme";

import "styled-components";

declare module "*.module.scss";

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV?: "development" | "production" | "test";
        }
    }
}

type AppTheme = typeof theme;

declare module "styled-components" {
    interface DefaultTheme extends AppTheme {}
}
