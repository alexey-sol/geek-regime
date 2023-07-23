import { theme } from "@/app/style/theme";

type AppTheme = typeof theme;

declare module "styled-components" {
    interface DefaultTheme extends AppTheme {}
}
