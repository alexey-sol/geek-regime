import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@/shared/components/typography";
import { NavbarStyled, ListStyled, NavbarInnerStyled } from "./navbar.style";

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

                <section>Profile</section>

                <section>Search</section>

                <section>Spaces</section>

                <section>
                    <Link to="">Add new space</Link>
                </section>
            </NavbarInnerStyled>
        </NavbarStyled>
    );
};
