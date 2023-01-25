import React, { useRef } from "react";

import { ProfileDropdown } from "@/features/auth/components/profile-dropdown";
import { ProfileIconButton } from "@/shared/components/icon-button";
import { useProfileItemData } from "@/shared/components/layout/navbar/navbar-menu/utils";
import { AuthDialog } from "@/features/auth/components/auth-dialog";

import { ProfileItemStyled } from "./style";

export const ProfileItem = () => {
    const profileItemRef = useRef<HTMLElement>(null);

    const {
        handleClick,
        showAuthDialog,
        showProfileDropdown,
    } = useProfileItemData();

    return (
        <ProfileItemStyled ref={profileItemRef}>
            <ProfileIconButton onClick={handleClick} />

            {showProfileDropdown && (
                <ProfileDropdown anchorRef={profileItemRef} onClose={handleClick} />
            )}

            {showAuthDialog && (
                <AuthDialog onClose={handleClick} />
            )}
        </ProfileItemStyled>
    );
};
