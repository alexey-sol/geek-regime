import React, { type FC } from "react";
import { type LinkProps, useLocation } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit/components/typography";

import { TabLinkStyled } from "./style";

type NavbarItemProps = Pick<LinkProps, "to"> & {
    title: string;
};

export const NavbarTab: FC<NavbarItemProps> = ({ title, to }) => {
    const location = useLocation();

    return (
        <TabLinkStyled
            $isActive={location.pathname.startsWith(`/${to}`)}
            to={to}
        >
            <Typography>{title}</Typography>
        </TabLinkStyled>
    );
};
