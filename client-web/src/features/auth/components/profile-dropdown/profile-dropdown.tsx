import React from "react";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";

import { ProfileButtonStyled, ProfileDropdownStyled, ProfileListStyled } from "./style";

export type ProfileDropdownProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const ProfileDropdown = ({ anchorRef, onClose }: ProfileDropdownProps) => {
    const { t } = useTranslation();

    const { isPending, signOut } = useAuthContext();

    const openProfile = () => {
        console.log("Open profile");
    };

    return (
        <ProfileDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            position="bottom-right"
        >
            <ProfileListStyled>
                <li>
                    <ProfileButtonStyled onClick={openProfile} view="transparent">
                        {t("profile.actions.profile")}
                    </ProfileButtonStyled>
                </li>

                <li>
                    <ProfileButtonStyled disabled={isPending} onClick={signOut} view="transparent">
                        {t("profile.actions.signOut")}
                    </ProfileButtonStyled>
                </li>
            </ProfileListStyled>
        </ProfileDropdownStyled>
    );
};
