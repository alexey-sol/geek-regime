import React, { type FC } from "react";
import { useTranslation } from "react-i18next";

import { useAuthContext } from "@/features/auth/contexts/auth";
import type { ElementPosition } from "@/shared/components/base-popup";

import { ProfileButtonStyled, ProfileDropdownStyled, ProfileListStyled } from "./style";

const DROPDOWN_POSITION: ElementPosition = ["right", "bottom"];

export type ProfileDropdownProps = {
    anchorRef?: React.RefObject<HTMLElement>;
    onClose: () => void;
};

export const ProfileDropdown: FC<ProfileDropdownProps> = ({ anchorRef, onClose }) => {
    const { t } = useTranslation();

    const { isPending, signOut } = useAuthContext();

    const openProfile = () => {
        console.log("Open profile");
    };

    return (
        <ProfileDropdownStyled
            anchorRef={anchorRef}
            onClose={onClose}
            position={DROPDOWN_POSITION}
        >
            <ProfileListStyled>
                <li>
                    <ProfileButtonStyled onClick={openProfile} view="transparent">
                        {t("auth.profile.actions.profile")}
                    </ProfileButtonStyled>
                </li>

                <li>
                    <ProfileButtonStyled disabled={isPending} onClick={signOut} view="transparent">
                        {t("auth.profile.actions.signOut")}
                    </ProfileButtonStyled>
                </li>
            </ProfileListStyled>
        </ProfileDropdownStyled>
    );
};
