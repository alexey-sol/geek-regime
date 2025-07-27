import React, { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { type ElementPosition } from "@eggziom/geek-regime-js-ui-kit";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import { createAbsolutePostsPath } from "@/features/posts/utils/helpers";
import { paths } from "@/shared/const";

import { ProfileButtonStyled, ProfileDropdownStyled, ProfileListStyled } from "./style";

const DROPDOWN_POSITION: ElementPosition = ["center-left", "bottom"];

export type ProfileDropdownProps = {
    anchorRef: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const ProfileDropdown: FC<ProfileDropdownProps> = ({ anchorRef, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { pending, profile, signOut } = useAuthContext();

    if (!profile) {
        return null;
    }

    const goToCreatePost = () => {
        navigate(createAbsolutePostsPath(paths.CREATE));
        onClose();
    };

    const goToProfile = () => {
        navigate(createAbsoluteUsersPath(profile.slug));
        onClose();
    };

    return (
        <ProfileDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            position={DROPDOWN_POSITION}
        >
            <ProfileListStyled>
                <li>
                    <ProfileButtonStyled onClick={goToCreatePost}>
                        {t("auth.profile.actions.createPost")}
                    </ProfileButtonStyled>
                </li>

                <li>
                    <ProfileButtonStyled onClick={goToProfile}>
                        {t("auth.profile.actions.profile")}
                    </ProfileButtonStyled>
                </li>

                <li>
                    <ProfileButtonStyled disabled={Boolean(pending)} onClick={signOut}>
                        {t("auth.profile.actions.signOut")}
                    </ProfileButtonStyled>
                </li>
            </ProfileListStyled>
        </ProfileDropdownStyled>
    );
};
