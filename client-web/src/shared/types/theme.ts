import { DefaultTheme, FlattenInterpolation, ThemeProps } from "styled-components";

export type Color = keyof DefaultTheme["colors"];

export type ColorValue = DefaultTheme["colors"][Color];

export type Font = keyof DefaultTheme["fonts"];

export type Size = keyof DefaultTheme["sizes"];

export type SizeValue = DefaultTheme["sizes"][Size];

export type MapKeyToCss<Key extends string> = Record<
    Key,
    FlattenInterpolation<ThemeProps<DefaultTheme>>
>;
