import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@/shared/components/typography";
import { ProfileIconButton, SearchIconButton } from "@/shared/components/icon-button";
import { ProfileAction } from "@/shared/components/layout/navbar/profile-action";
import {
    NavbarStyled, ListStyled, NavbarInnerStyled, ActionsStyled,
} from "./style";

export const Navbar = () => {
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

                <ActionsStyled>
                    <section>Spaces</section>

                    <section>
                        <Link to="">Add new space</Link>
                    </section>

                    <SearchIconButton onClick={() => console.log("Search")} />

                    <ProfileAction />
                </ActionsStyled>
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
