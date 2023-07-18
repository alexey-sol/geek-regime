import type { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type Color = keyof DefaultTheme["colors"];

export type ColorValue = DefaultTheme["colors"][Color];

export type Font = keyof DefaultTheme["fonts"];

export type FontSize = keyof DefaultTheme["fontSizes"];

export type MapKeyToCss<Key extends string> = Record<
    Key,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
>;
