import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@/shared/components/typography";
import { SearchIconButton } from "@/shared/components/icon-button";
import { ProfileAction } from "./profile-action";
import {
    ActionsWrapStyled,
    ListStyled,
    NavbarInnerStyled,
    NavbarStyled,
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

                <ActionsWrapStyled>
                    <section>Spaces</section>

                    <section>
                        <Link to="">Add new space</Link>
                    </section>

                    <SearchIconButton onClick={() => console.log("Search")} />

                    <ProfileAction />
                </ActionsWrapStyled>
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
