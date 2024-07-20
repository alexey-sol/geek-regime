import React, { type FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@eggziom/geek-regime-js-ui-kit";
import { useTranslation } from "react-i18next";

import {
    ListStyled,
    NavbarInnerStyled,
    NavbarStyled,
} from "./style";
import { NavbarMenu } from "./navbar-menu";

export const Navbar: FC = () => {
    const { t } = useTranslation();
    const isWithinSpace = true;

    return (
        <NavbarStyled>
            <NavbarInnerStyled>
                {isWithinSpace && (
                    <ListStyled>
                        <li><Link to="posts"><Typography>{t("shared.navbar.postsTab.title")}</Typography></Link></li>
                        <li><Link to="users"><Typography>{t("shared.navbar.authorsTab.title")}</Typography></Link></li>
                    </ListStyled>
                )}

                <NavbarMenu />
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
