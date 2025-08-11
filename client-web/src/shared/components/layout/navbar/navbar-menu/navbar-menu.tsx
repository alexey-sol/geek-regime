import React, { type FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SearchIconButton } from "@eggziom/geek-regime-js-ui-kit/components/icon-button";

import { NavbarMenuStyled } from "./style";
import { ProfileItem } from "./profile-item";

import { createAbsoluteSearchPath } from "@/features/search/utils/helpers";
import { paths } from "@/shared/const";

export const NavbarMenu: FC = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const goToSearch = () => navigate({
        pathname: createAbsoluteSearchPath(paths.POSTS),
        search: searchParams.toString(),
    });

    return (
        <NavbarMenuStyled>
            <SearchIconButton onClick={goToSearch} title={t("shared.navbar.searchButton.tooltip")} />
            <ProfileItem />
        </NavbarMenuStyled>
    );
};
