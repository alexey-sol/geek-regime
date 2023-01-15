import React, { useRef } from "react";

import { ProfileDropdown } from "@/features/auth/components/profile-dropdown";
import { ProfileIconButton } from "@/shared/components/icon-button";
import { SignInDialog } from "@/features/auth/components/sign-in-dialog";
import { useProfileItemData } from "@/shared/components/layout/navbar/navbar-menu/utils";

import { ProfileItemStyled } from "./style";

export const ProfileItem = () => {
    const profileItemRef = useRef<HTMLElement>(null);

    const {
        handleClick,
        showProfileDropdown,
        showSignInDialog,
    } = useProfileItemData();

    return (
        <ProfileItemStyled ref={profileItemRef}>
            <ProfileIconButton onClick={handleClick} />

            {showProfileDropdown && (
                <ProfileDropdown anchorRef={profileItemRef} onClose={handleClick} />
            )}

            {showSignInDialog && (
                <SignInDialog onClose={handleClick} />
            )}
        </ProfileItemStyled>
    );
};
