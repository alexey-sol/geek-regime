import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { ListStyled, NavbarInnerStyled, NavbarStyled } from "./style";
import { NavbarMenu } from "./navbar-menu";
import { NavbarTab } from "./navbar-tab";
import { NAVBAR_TAB_DATA } from "./const";

export const Navbar: FC = () => {
    const { t } = useTranslation();
    const isWithinSpace = true;

    return (
        <NavbarStyled>
            <NavbarInnerStyled>
                {isWithinSpace && (
                    <ListStyled>
                        {NAVBAR_TAB_DATA.map(({ key, to }) => (
                            <li key={key}>
                                <NavbarTab title={t(key)} to={to} />
                            </li>
                        ))}
                    </ListStyled>
                )}

                <NavbarMenu />
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
