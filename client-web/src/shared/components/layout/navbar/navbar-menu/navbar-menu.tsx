import React from "react";
import { Link } from "react-router-dom";

import { SearchIconButton } from "@/shared/components/icon-button";

import { NavbarMenuStyled } from "./style";
import { ProfileItem } from "./profile-item";

export const NavbarMenu = () => (
    <NavbarMenuStyled>
        <section>Spaces</section>

        <section>
            <Link to="">Add new space</Link>
        </section>

        <SearchIconButton onClick={() => console.log("Search")} />

        <ProfileItem />
    </NavbarMenuStyled>
);
