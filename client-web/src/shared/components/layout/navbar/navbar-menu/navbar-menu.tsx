import React, { type FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { SearchIconButton } from "@/shared/components/icon-button";
import { createAbsoluteSearchPath } from "@/features/search/utils/helpers";
import { paths } from "@/shared/const";

import { NavbarMenuStyled } from "./style";
import { ProfileItem } from "./profile-item";

export const NavbarMenu: FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const goToSearch = () => navigate({
        pathname: createAbsoluteSearchPath(paths.POSTS),
        search: searchParams.toString(),
    });

    return (
        <NavbarMenuStyled>
            <section>Spaces</section>

            <section>
                <Link to="">Add new space</Link>
            </section>

            <SearchIconButton onClick={goToSearch} />

            <ProfileItem />
        </NavbarMenuStyled>
    );
};
