import { theme } from "@/shared/style/theme";

import "styled-components";

declare module "*.module.scss";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: theme["colors"];
        components: theme["components"];
        durations: theme["durations"];
        fonts: theme["fonts"];
        mixins: theme["mixins"];
        sizes: theme["sizes"];
    }
}
