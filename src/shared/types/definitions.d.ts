import { theme } from "@/shared/style/theme";

import "styled-components";

declare module "*.module.scss";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: theme["colors"];
        components: theme["components"];
        fonts: theme["fonts"];
        fontColors: theme["fontColors"];
        fontSizes: theme["fontSizes"];
        mixins: theme["mixins"];
    }
}
