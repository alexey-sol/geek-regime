import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";

import {
    ListStyled,
    NavbarInnerStyled,
    NavbarStyled,
} from "./style";
import { NavbarMenu } from "./navbar-menu";

export const Navbar: FC = () => {
    const isWithinSpace = true;

    return (
        <NavbarStyled>
            <NavbarInnerStyled>
                {isWithinSpace && (
                    <ListStyled>
                        <li><Link to="posts"><Typography>Posts</Typography></Link></li>
                        <li><Link to="wiki"><Typography>Wiki</Typography></Link></li>
                    </ListStyled>
                )}

                <NavbarMenu />
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
