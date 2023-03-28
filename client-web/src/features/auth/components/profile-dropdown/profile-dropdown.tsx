import React, { type FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { useAuthContext } from "@/features/auth/contexts/auth";
import { createAbsoluteUsersPath } from "@/features/users/utils/helpers";
import type { ElementPosition } from "@/shared/components/base-popup";

import { ProfileButtonStyled, ProfileDropdownStyled, ProfileListStyled } from "./style";

const DROPDOWN_POSITION: ElementPosition = ["center-left", "bottom"];

export type ProfileDropdownProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const ProfileDropdown: FC<ProfileDropdownProps> = ({ anchorRef, onClose }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { pending, profile, signOut } = useAuthContext();

    const goToProfile = useCallback(() => {
        if (profile) {
            navigate(createAbsoluteUsersPath(profile.slug));
        }

        onClose();
    }, [navigate, onClose, profile]);

    if (!profile) {
        return null;
    }

    return (
        <ProfileDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            position={DROPDOWN_POSITION}
        >
            <ProfileListStyled>
                <li>
                    <ProfileButtonStyled onClick={goToProfile} view="transparent">
                        {t("auth.profile.actions.profile")}
                    </ProfileButtonStyled>
                </li>

                <li>
                    <ProfileButtonStyled
                        disabled={Boolean(pending)}
                        onClick={signOut}
                        view="transparent"
                    >
                        {t("auth.profile.actions.signOut")}
                    </ProfileButtonStyled>
                </li>
            </ProfileListStyled>
        </ProfileDropdownStyled>
    );
};
