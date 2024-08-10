import React, { type FC } from "react";

import { LinkProps } from "@/components/link";

import { Typography } from "../typography";

import { BaseButtonProps } from "./base-button";
import { LinkButtonStyled } from "./style";

export type LinkButtonProps = BaseButtonProps & Pick<LinkProps, "view">;

export const LinkButton: FC<LinkButtonProps> = ({
    children,
    fontSize,
    font,
    ...rest
}) => (
    <LinkButtonStyled {...rest}>
        <Typography font={font} fontSize={fontSize}>
            {children}
        </Typography>
    </LinkButtonStyled>
);
