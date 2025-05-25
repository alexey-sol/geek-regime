import React, { type FC } from "react";

import { LinkProps } from "@/components/link";
import { type LinkDecorationProps } from "@/style/mixins/link-decoration";

import { Typography } from "../typography";

import { BaseButtonProps } from "./base-button";
import { LinkButtonStyled } from "./style";

export type LinkButtonProps = BaseButtonProps & Pick<LinkProps, "as"> & Pick<LinkDecorationProps, "view">;

export const LinkButton: FC<LinkButtonProps> = ({
    as: tagName = "span",
    children,
    fontSize,
    font,
    ...rest
}) => (
    <LinkButtonStyled {...rest}>
        <Typography as={tagName} font={font} fontSize={fontSize}>
            {children}
        </Typography>
    </LinkButtonStyled>
);
