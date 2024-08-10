import React, { type FC, type PropsWithChildren } from "react";
import { type LinkDecorationProps } from "@/style/mixins/link-decoration";
import { type LinkProps as ReactLinkProps } from "react-router-dom";

import { Typography, type TypographyProps } from "../typography";

import { LinkStyled } from "./style";

export type LinkProps = PropsWithChildren<Pick<ReactLinkProps, "to" | "replace">
    & LinkDecorationProps
    & Omit<TypographyProps, "view">>;

export const Link: FC<LinkProps> = ({
    children,
    color,
    to,
    replace,
    view,
    ...rest
}) => (
    <LinkStyled color={color} to={to} replace={replace} view={view}>
        <Typography {...rest}>
            {children}
        </Typography>
    </LinkStyled>
);
