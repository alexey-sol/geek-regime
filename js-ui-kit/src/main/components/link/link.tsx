import React, { type FC, type PropsWithChildren } from "react";
import { type LinkProps as RouterDomLinkProps } from "react-router-dom";

import { type LinkDecorationProps } from "@/style/mixins/link-decoration";

import { Typography, type TypographyProps } from "../typography";

import { LinkStyled } from "./style";

export type LinkProps = PropsWithChildren<Pick<RouterDomLinkProps, "to" | "replace">
    & LinkDecorationProps
    & Omit<TypographyProps, "view">>;

export const Link: FC<LinkProps> = ({
    as: tagName = "span",
    children,
    className,
    color,
    to,
    replace,
    view,
    ...rest
}) => (
    <LinkStyled color={color} className={className} to={to} replace={replace} view={view}>
        <Typography as={tagName} {...rest}>
            {children}
        </Typography>
    </LinkStyled>
);
