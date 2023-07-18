import { baseTheme } from "@/style/theme";

type BaseTheme = typeof baseTheme;

declare module "styled-components" {
    interface DefaultTheme extends BaseTheme {}
}
